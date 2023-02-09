import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndexService } from './index.service';
import { UpdateIndexDto } from './dto/update-index.dto';
import { indexInfoObject } from './index.const';
import { GetIndexDto, IndexDto } from './dto/get-index.dto';

@Controller('index')
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  async findAll(): Promise<GetIndexDto> {
    const response = await this.indexService.findAll();
    const indexData = response.data;
    const info = {
      version: indexData.version,
      autor: indexData.autor,
      fecha: indexData.fecha,
    };
    const data = Object.values(indexData).filter(
      (item) => typeof item === 'object',
    );
    return {
      ...info,
      values: data as IndexDto[],
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.indexService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIndexDto: UpdateIndexDto) {
    return this.indexService.update(+id, updateIndexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.indexService.remove(+id);
  }
}
