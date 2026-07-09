import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam
} from "inversify-express-utils";
import { UserService } from "./service";
import { toCreateUserDto } from "./user.dto";

@controller("/users")
export class UserController extends BaseHttpController {
  constructor(@inject("UserService") private readonly userService: UserService) {
    super();
  }

  @httpGet("/")
  async index() {
    return this.ok(await this.userService.findAll());
  }

  @httpGet("/:id")
  async show(@requestParam("id") id: string) {
    const user = await this.userService.findById(Number(id));

    if (!user) {
      return this.notFound();
    }

    return this.ok(user);
  }

  @httpPost("/")
  async create(@requestBody() body: unknown) {
    const dto = await toCreateUserDto(body);
    const user = await this.userService.create(dto);

    return this.json(user, 201);
  }
}
