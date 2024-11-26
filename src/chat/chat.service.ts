import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class ChatService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }

  async storeChatByUserId(userId: string, message: string) {
    const userChats = await this.userChats.findFirst({
      where: {
        userId,
      },
    });

    const newChat = { date: new Date(), message };

    if (!userChats) {
      await this.userChats.create({
        data: {
          userId,
          chats: [newChat],
        },
      });
    } else {
      const chatsArray = Array.isArray(userChats.chats)
        ? (userChats.chats as Prisma.JsonArray)
        : [];

      const updatedChats = [...chatsArray, newChat];

      await this.userChats.update({
        where: {
          id: userChats.id,
        },
        data: {
          chats: updatedChats,
        },
      });
    }
  }
}
