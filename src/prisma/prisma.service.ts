import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    const connectionString = config.getOrThrow<string>('DATABASE_URL');
    // PrismaPg ignores ?schema= in the URL unless schema is passed explicitly
    const schema =
      new URL(connectionString).searchParams.get('schema') ?? undefined;

    const adapter = new PrismaPg(
      {
        connectionString,
        ...(schema ? { options: `-c search_path="${schema}",public` } : {}),
      },
      { schema },
    );
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
