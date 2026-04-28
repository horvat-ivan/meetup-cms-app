import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import type { CreateArticleDto, UpdateArticleDto } from './articles.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articles: ArticlesService) {}

  @Get()
  list() {
    return this.articles.list();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.articles.getById(id);
  }

  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articles.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articles.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.articles.remove(id);
  }
}
