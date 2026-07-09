import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { CreatePostDto } from "./post.dto";

@injectable()
export class PostService {
  constructor(@inject("PrismaClient") private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true
      },
      orderBy: {
        id: "asc"
      }
    });
  }

  findById(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true
      }
    });
  }

  create(data: CreatePostDto) {
    return this.prisma.post.create({
      data
    });
  }
}
