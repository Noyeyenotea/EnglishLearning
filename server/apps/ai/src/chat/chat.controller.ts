import { Controller, Get, Body, Post, Res, Query } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';
import type { ChatDto, ChatRoleType } from '@en/common/chat';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async create(@Body() body: ChatDto, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const stream = await this.chatService.streamCompletion(body);
    for await (const chunk of stream) {
      const [msg] = chunk;
      const thinkMsg = msg.additional_kwargs?.reasoning_content ?? '';
      if (thinkMsg) {
        res.write(
          `data: ${JSON.stringify({ content: thinkMsg, role: 'ai', type: 'reasoning' })}\n\n`,
        );
      }
      res.write(
        `data: ${JSON.stringify({ content: msg.content, role: 'ai' })}\n\n`,
      );
    }
    res.end();
  }
  @Get('history')
  async findHistory(
    @Query('userId') userId: string,
    @Query('role') role: ChatRoleType,
  ): Promise<any> {
    return this.chatService.findAll(userId, role);
  }
}
