/* eslint-disable prettier/prettier */
import { OpenRouter } from '@openrouter/sdk';

const openRouter = new OpenRouter({
  apiKey: process.env.API_KEY || '',
});

export const apiCall = async () => {
  // Stream the response from the API
  const stream = await openRouter.chat.send({
    chatGenerationParams: {
      model: 'openrouter/hunter-alpha',
      messages: [
        {
          role: 'system',
          content:
            'You are a medical assistant that helps users understand their symptoms and provides information about potential conditions. You should provide accurate and helpful information based on the symptoms described by the user. Suggest doctor category specialization based on symptoms.',
        },
        { role: 'user', content: "How many r's are in the word 'strawberry'?" },
      ],
      stream: true,
    },
  });

  let response = '';
  for await (const chunk of stream) {
    const content = chunk.choices[0].delta.content;
    if (content) {
      response += content;
      process.stdout.write(content);
    }

    // Usage information comes in the final chunk
    if (chunk.usage) {
      console.log('\nReasoning tokens:', chunk.usage.totalTokens);
    }
  }

  return response;
};
