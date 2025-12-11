import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const stripTrailingSlash = (value?: string) =>
    value ? value.replace(/\/$/, '') : value;

  const isProd = process.env.NODE_ENV === 'production';
  const prodOrigin = stripTrailingSlash(
    process.env.CORS_ORIGIN ??
      process.env.FRONTEND_URL ??
      'https://docfrontend-gamma.vercel.app',
  );
  const origin = isProd ? prodOrigin : '*';

  if (isProd && !prodOrigin) {
    new Logger('Bootstrap').warn(
      'CORS_ORIGIN/FRONTEND_URL not set; using default deployed frontend origin.',
    );
  }

  app.enableCors({
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
