// src/dropshipper/dropshipper.controller.ts

import { Controller, Post, Body, Get, Query, Res, HttpException, HttpStatus } from '@nestjs/common';
import { DropshipperService } from './dropshipper.service';
import { CreateDropshipperDto } from './dto/create-dropshipper.dto';
import type { Response } from 'express';

@Controller('dropshippers')
export class DropshipperController {
  constructor(private readonly dropshipperService: DropshipperService) {}

  @Post()
  async create(@Body() dto: CreateDropshipperDto) {
    return this.dropshipperService.createDropshipper(dto);
  }

  @Get('connect')
  async connectShopify(@Query('shop') shop: string, @Query('email') email: string, @Res() res: Response) {
    console.log('yes');
    if (!shop) {
      throw new HttpException('Shop parameter is required', HttpStatus.BAD_REQUEST);
    }

    const redirectUrl = this.dropshipperService.getShopifyAuthUrl(shop, email);
    console.log('[Redirecting to]:', redirectUrl);
    return res.redirect(redirectUrl);
  }

  @Get('callback')
async shopifyCallback(
  @Query('shop') shop: string,
  @Query('code') code: string,
  @Query('state') state: string,
  @Res() res: Response,
) {
  try {
    const token = await this.dropshipperService.handleShopifyCallback(shop, code, state);
    console.log('Access Token:', token);
    res.send('Shopify store connected!');
  } catch (error) {
    console.error('Error during Shopify callback:', error);
    res.status(500).send('Something went wrong: ' + error.message);
  }
}

}
