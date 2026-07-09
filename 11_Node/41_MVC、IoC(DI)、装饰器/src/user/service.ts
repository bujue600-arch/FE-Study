import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { CreateUserDto } from "./user.dto";

@injectable()
export class UserService {
  constructor(@inject("PrismaClient") private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.user.findMany({
      include: {
        posts: true
      },
      orderBy: {
        id: "asc"
      }
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: true
      }
    });
  }

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data
    });
  }
}
