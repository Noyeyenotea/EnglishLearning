import { Injectable } from '@nestjs/common';
import type { WordQuery } from '@en/common/word';
import { PrismaService, ResponseService } from '@libs/shared';
import { Prisma } from '@libs/shared/generated/prisma/client';
@Injectable()
export class WordBookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly response: ResponseService,
  ) {}
  private toBoolean(value: string | boolean): true | undefined {
    return value === 'true' ? true : undefined;
  }
  async findAll(query: WordQuery) {
    const { page, pageSize, word, ...rest } = query;
    const tags = Object.fromEntries(
      Object.entries(rest).map(([key, value]): [string, true | undefined] => {
        return [key, this.toBoolean(value)];
      }),
    );
    const where: Prisma.WordBookWhereInput = {
      word: word
        ? {
            contains: word,
          }
        : undefined,
      ...tags,
    };
    const [total = 0, list = []] = await Promise.all([
      this.prisma.wordBook.count({ where }),
      this.prisma.wordBook.findMany({
        where,
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        orderBy: {
          frq: 'desc',
        },
      }),
    ]);
    return this.response.success({ list, total });
  }
}
