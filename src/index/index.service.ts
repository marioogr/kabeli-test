import { Injectable } from '@nestjs/common';
import { CreateIndexDto } from './dto/create-index.dto';
import { UpdateIndexDto } from './dto/update-index.dto';
import { indexProviderUrl } from './index.const';
import { HttpService } from '@nestjs/axios';
import { catchError, first, firstValueFrom } from 'rxjs';

@Injectable()
export class IndexService {
  constructor(private readonly httpService: HttpService) {}
  create(createIndexDto: CreateIndexDto) {
    return 'This action adds a new index';
  }

  findAll() {
    return this.httpService.axiosRef.get(indexProviderUrl);
  }

  findOne(id: number) {
    return `This action returns a #${id} index`;
  }

  update(id: number, updateIndexDto: UpdateIndexDto) {
    return `This action updates a #${id} index`;
  }

  remove(id: number) {
    return `This action removes a #${id} index`;
  }
}
