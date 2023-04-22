import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequest } from './create-user-request.dto';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class GatewayService {
  private readonly users: any[] = [];

  constructor(
    @Inject('GATEWAY_SERVICE')
    private readonly communicationClient: ClientProxy,
  ) {}

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
  }
  getHello(): string {
    return 'Hello World!';
  }
}
