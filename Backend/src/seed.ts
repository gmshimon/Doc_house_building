/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import 'dotenv/config';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createClient } from '@supabase/supabase-js';
import { resolve, join } from 'node:path';
import { readFile, readdir } from 'node:fs/promises';

function validateEnv(): {
  supabaseUrl: string;
  supabaseKey: string;
  openAiKey: string;
} {
  const supabaseUrl = process.env.SUPABASE_DB_URL;
  const supabaseKey = process.env.SUPABASE_DB_KEY; // service role, not anon
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !supabaseKey || !openAiKey) {
    console.error('❌ Missing environment variables. Required:');
    if (!supabaseUrl) console.error('   - SUPABASE_DB_URL');
    if (!supabaseKey) console.error('   - SUPABASE_SERVICE_ROLE_KEY');
    if (!openAiKey) console.error('   - OPENAI_API_KEY');
    process.exit(1);
  }

  return { supabaseUrl, supabaseKey, openAiKey };
}

function extractMetadata(
  content: string,
  filename: string,
): Record<string, string> {
  const get = (key: string) =>
    content.match(new RegExp(`${key}:\\s*(.+)`))?.[1]?.trim() ?? 'unknown';

  return {
    source: get('SOURCE'),
    topic_category: get('TOPIC_CATEGORY'),
    date_added: get('DATE_ADDED'),
    filename,
  };
}

const processFile = async (
  filePath: string,
  vectoreStore: SupabaseVectorStore,
  splitter: RecursiveCharacterTextSplitter,
): Promise<number> => {
  const filename = filePath.split('/').pop() ?? filePath;
  const text = await readFile(filePath, 'utf8');

  const metadaata = extractMetadata(text, filename);

  const chunks = await splitter.createDocuments([text], [{ ...metadaata }]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = await vectoreStore.addDocuments(chunks);
  console.log(result);
  return chunks.length;
};

const main = async (): Promise<void> => {
  const { supabaseUrl, supabaseKey, openAiKey } = validateEnv();
  const DOCS_DIR = resolve('docs');

  const allFiles = await readdir(DOCS_DIR);
  const txtFiles = allFiles
    .filter((f) => f.endsWith('.txt'))
    .map((f) => join(DOCS_DIR, f));

  if (txtFiles.length === 0) {
    console.error('❌ No .txt files found in ./docs');
    process.exit(1);
  }

  console.log(`📂 Found ${txtFiles.length} documents to process\n`);

  // Initialise clients
  const client = createClient(supabaseUrl, supabaseKey);

  const vectorStore = new SupabaseVectorStore(
    new OpenAIEmbeddings({
      openAIApiKey: openAiKey,
      model: 'text-embedding-3-small',
      configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
      },
    }),
    {
      client,
      tableName: 'documents',
      queryName: 'match_documents',
    },
  );

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 50,
    separators: ['\n\nSECTION:', '\n\n', '\n', ' '],
  });

  // Process each file
  let totalChunks = 0;

  for (const filePath of txtFiles) {
    const filename = filePath.split('/').pop();
    process.stdout.write(`⚙️  Processing ${filename}... `);

    try {
      const count = await processFile(filePath, vectorStore, splitter);
      totalChunks += count;
      console.log(`✅ ${count} chunks embedded`);
    } catch (error) {
      console.error(`❌ Failed: ${(error as Error).message}`);
      // Continue processing remaining files instead of crashing
    }
  }

  console.log(
    `\n🎉 Done. ${txtFiles.length} files processed, ${totalChunks} total chunks embedded.`,
  );
};

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
