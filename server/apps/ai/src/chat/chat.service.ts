import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  createDeepSeek,
  createCheckpoint,
  createDeepSeekReasoning,
  createBochaSearch,
} from '../llm/llm.config';
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';
import { chatMode } from '../prompt/prompt.mode';
import type { ReactAgent } from 'langchain';
import type { ChatRoleType, ChatDto } from '@en/common/chat';
import { AIMessageChunk, createAgent } from 'langchain';
import { ResponseService } from '@libs/shared';
@Injectable()
export class ChatService implements OnModuleInit {
  private checkPointer: PostgresSaver = null!;
  private agents: Map<ChatRoleType, ReactAgent> = new Map();
  constructor(private readonly responseService: ResponseService) {}
  async onModuleInit() {
    // 初始化模型和检查点
    this.checkPointer = await createCheckpoint();
    for (const mode of chatMode) {
      const agent = createAgent({
        model: createDeepSeek(),
        systemPrompt: mode.prompt,
        checkpointer: this.checkPointer,
      });
      this.agents.set(mode.role, agent);
    }
  }
  //流式返回
  async streamCompletion(createChatDto: ChatDto) {
    let model = createDeepSeek(); //普通模型
    if (createChatDto.deepThink) {
      model = createDeepSeekReasoning(); //深度思考模型
    }
    const findmode = chatMode.find((item) => item.role === createChatDto.role);
    if (!findmode) {
      throw new Error('模式不存在');
    }
    let prompt = findmode.prompt;
    const content = createChatDto.content;
    if (createChatDto.webSearch) {
      const webSearchPrompt = await createBochaSearch(createChatDto.content);
      prompt += `请根据以下搜索结果回答问题：${webSearchPrompt}(并且返回你参考的网站名称)，用户问题：${content}`;
    }
    const agent = createAgent({
      model: model, //模型
      systemPrompt: prompt, //系统提示词
      checkpointer: this.checkPointer, //检查点
    });
    if (!agent) {
      throw new Error('模式不存在');
    }
    // 线程id: userId-role
    const id = `${createChatDto.userId}-${createChatDto.role}`;
    //组装消息格式
    const stream = agent.stream(
      {
        messages: [{ role: 'human', content }],
      },
      {
        configurable: { thread_id: id }, //用于做会话隔离 + 历史记录存储
        streamMode: 'messages', //流式输出模式
      },
    );
    return stream;
  }
  async findAll(userId: string, role: ChatRoleType) {
    const messages = await this.checkPointer.get({
      configurable: { thread_id: `${userId}-${role}` },
    });
    const list = messages?.channel_values?.messages as AIMessageChunk[];
    if (!list || list.length === 0) {
      return this.responseService.success([]);
    }

    return this.responseService.success(
      list?.map((item) => ({
        content: item.content,
        role: item.type,
        //返回推理内容
        reasoning: item.additional_kwargs?.reasoning_content ?? '',
      })) || [],
    );
  }
}
