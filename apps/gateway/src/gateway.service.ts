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
    @Inject('PRODUCT_SERVICE')
    private readonly analyticsClient: ClientProxy,
    @Inject('ORDER_SERVICE')
    private readonly orderClient: ClientProxy,
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

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
  getFromOrderService() {
    return this.orderClient.send({ cmd: 'get_order' }, {});
  }
}
