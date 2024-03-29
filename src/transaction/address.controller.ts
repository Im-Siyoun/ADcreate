import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import { Address } from './schemas/address.schema';
import { AddressService } from './address.service';

@Controller('/address')
export class AddressController {
  constructor(private readonly addresservice: AddressService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    const address = await this.addresservice.create(createAddressDto);

    return address;
  }

  @Get('/')
  @HttpCode(200)
  async find(): Promise<Address[]> {
    return this.addresservice.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.addresservice.find(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAddressDto: UpdateAddressDto,
  ): Promise<any> {
    return this.addresservice.update(id, updateAddressDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<any> {
    return this.addresservice.delete(id);
  }
}
