# MVC + IoC(DI) + Decorators

这是一个 Express + Inversify 的 MVC 示例项目，包含：

- `inversify` + `reflect-metadata`：依赖注入和装饰器元数据
- `inversify-express-utils`：基于装饰器声明 Express Controller
- `prisma` + `@prisma/client`：ORM 和数据库访问
- `class-validator` + `class-transformer`：DTO 转换与校验

## 目录结构

```txt
src
├─ db
│  └─ index.ts
├─ post
│  ├─ controller.ts
│  ├─ post.dto.ts
│  └─ service.ts
├─ user
│  ├─ controller.ts
│  ├─ service.ts
│  └─ user.dto.ts
└─ main.ts
prisma
└─ schema.prisma
```

## 启动

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

默认使用 MySQL，请先创建数据库，并按自己的账号密码修改 `.env`：

```sql
CREATE DATABASE mvc_ioc_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

默认地址：

- `GET http://localhost:3000/health`
- `GET http://localhost:3000/api/users`
- `POST http://localhost:3000/api/users`
- `GET http://localhost:3000/api/posts`
- `POST http://localhost:3000/api/posts`

## 示例请求

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"tom@example.com\",\"name\":\"Tom\"}"
```

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Hello Prisma\",\"content\":\"MVC with DI\",\"authorId\":1}"
```

## 官方文档

- Express: https://expressjs.com/
- InversifyJS: https://inversify.io/
- inversify-express-utils: https://github.com/inversify/inversify-express-utils
- Prisma ORM: https://www.prisma.io/docs/orm
- class-validator: https://github.com/typestack/class-validator
- class-transformer: https://github.com/typestack/class-transformer
