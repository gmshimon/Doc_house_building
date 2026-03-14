import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OpenRouter } from '@openrouter/sdk';
@Injectable()
export class OpenrouterService {
  private openRouter: OpenRouter;

  constructor() {
    this.openRouter = new OpenRouter({
      apiKey: process.env.API_KEY || '',
    });
  }

  async generateStructureMedicalResponse(
    systemPrompt: string,
    userPrompt: string,
  ): Promise<string> {
    try {
      const stream = await this.openRouter.chat.send({
        chatGenerationParams: {
          model: 'openrouter/hunter-alpha',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            { role: 'user', content: userPrompt },
          ],
          stream: true,
        },
      });

      let response = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0].delta.content;
        if (content) {
          response += content;
        }
      }

      return response;
    } catch (error) {
      console.error('OpenRouter error:', error);
      throw new InternalServerErrorException('Failed to analyze symptoms');
    }
  }
}
