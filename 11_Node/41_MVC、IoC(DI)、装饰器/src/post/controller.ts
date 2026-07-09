import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam
} from "inversify-express-utils";
import { toCreatePostDto } from "./post.dto";
import { PostService } from "./service";

@controller("/posts")
export class PostController extends BaseHttpController {
  constructor(@inject("PostService") private readonly postService: PostService) {
    super();
  }

  @httpGet("/")
  async index() {
    return this.ok(await this.postService.findAll());
  }

  @httpGet("/:id")
  async show(@requestParam("id") id: string) {
    const post = await this.postService.findById(Number(id));

    if (!post) {
      return this.notFound();
    }

    return this.ok(post);
  }

  @httpPost("/")
  async create(@requestBody() body: unknown) {
    const dto = await toCreatePostDto(body);
    const post = await this.postService.create(dto);

    return this.json(post, 201);
  }
}
