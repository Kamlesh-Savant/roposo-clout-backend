// src/dropshipper/dropshipper.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import { CreateDropshipperDto } from './dto/create-dropshipper.dto';

@Injectable()
export class DropshipperService {
  constructor(private readonly prisma: PrismaService) {}

  private clientId = process.env.SHOPIFY_CLIENT_ID;
  private clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  private scopes = process.env.SHOPIFY_SCOPES;
  private redirectUri = process.env.SHOPIFY_REDIRECT_URI;

  async createDropshipper(dto: CreateDropshipperDto) {
    return this.prisma.dropshipper.create({
      data: {
        name: dto.name,
        email: dto.email,
        shop: null,
        accessToken: null,
      },
    });
  }

  getShopifyAuthUrl(shop: string, email: string): string {
    const state = encodeURIComponent(email);
    return `https://${shop}/admin/oauth/authorize?client_id=${this.clientId}&scope=${this.scopes}&redirect_uri=${this.redirectUri}&state=${state}`;
  }

  async handleShopifyCallback(shop: string, code: string, state: string) {
    const accessToken = await this.getAccessToken(shop, code);

    // First try updating existing record by email
    const updated = await this.prisma.dropshipper.updateMany({
      where: { email: state },
      data: { shop, accessToken },
    });

    if (updated.count === 0) {
      // Check if a record already exists with this shop
      const existing = await this.prisma.dropshipper.findUnique({
        where: { shop }, // assuming `shop` is marked as unique in schema
      });

      if (!existing) {
        await this.prisma.dropshipper.create({
          data: {
            name: 'Unknown',
            email: state,
            shop,
            accessToken,
          },
        });
      } else {
        // If already exists by shop, update accessToken
        await this.prisma.dropshipper.update({
          where: { shop },
          data: { accessToken },
        });
      }
    }

    return accessToken;
  }

  private async getAccessToken(shop: string, code: string): Promise<string> {
  try {
    const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get access token:', error.response?.data || error.message);
    throw new Error('Access token exchange failed');
  }
}

}
