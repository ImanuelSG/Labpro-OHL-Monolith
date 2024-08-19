import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class JwtService {
  private readonly secretKey: string = process.env.JWT_SECRET || 'default_secret';

  // Base64 URL encode a string
  private base64UrlEncode(data: string): string {
    return Buffer.from(data)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private base64UrlDecode(data: string): string {
    return Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
  }

  private createSignature(header: string, payload: string): string {
    const data = `${header}.${payload}`;
    return crypto.createHmac('sha256', this.secretKey).update(data).digest('base64url');
  }

  sign(payload: object, expiresIn: string | number = '1h'): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const issuedAt = Math.floor(Date.now() / 1000);
    const expiration = expiresIn === '1h' ? issuedAt + 3600 : issuedAt + Number(expiresIn);

    const payloadWithExp = { ...payload, iat: issuedAt, exp: expiration };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payloadWithExp));
    const signature = this.createSignature(encodedHeader, encodedPayload);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  verify(token: string): any {
    const [header, payload, signature] = token.split('.');

    const validSignature = this.createSignature(header, payload);
    if (signature !== validSignature) {
      throw new Error('Invalid token signature');
    }

    const decodedPayload = JSON.parse(this.base64UrlDecode(payload));

    if (decodedPayload.exp && Date.now() / 1000 > decodedPayload.exp) {
      throw new Error('Token has expired');
    }

    return decodedPayload;
  }

  // Method to decode a JWT token without verifying it
  decode(token: string): any {
    const [, payload] = token.split('.');
    const decodedPayload = this.base64UrlDecode(payload);
    return JSON.parse(decodedPayload);
  }
}
