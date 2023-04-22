import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/role/roles.guard';
import { Roles } from '../roles.decorator';
import { AdminRoleGuard } from '../../auth/guards/admin-role.guard';
import { UserRoleGuard } from '../../auth/guards/user-role.guard';

@Controller('product')
export class ProductController {
  @Get()
  @UseGuards(UserRoleGuard) // Chain the guards here
  async getProducts() {
    return 'This is a list of products';
  }
}
