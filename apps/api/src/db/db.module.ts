import { Module, Global } from '@nestjs/common';
import { dbProvider, DB_TOKEN } from './db.provider';

@Global()
@Module({
  providers: [dbProvider],
  exports: [DB_TOKEN],
})
export class DbModule {}
