import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateUserRequest } from './create-user-request.dto';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserRequest) {
    return this.gatewayService.createUser(createUserRequest);
  }
}
