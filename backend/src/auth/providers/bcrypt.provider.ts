import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // If data is a Buffer, convert it to string
    const passwordString = Buffer.isBuffer(data)
      ? data.toString('utf-8')
      : data;

    // generate salt
    const salt = await bcrypt.genSalt();

    // Return the hashed password
    return bcrypt.hash(passwordString, salt);
  }

  async comparePassword(data: string | Buffer, hash: string): Promise<boolean> {
    // If data is a Buffer, convert it to string
    const passwordString = Buffer.isBuffer(data)
      ? data.toString('utf-8')
      : data;

    // compare and return the result
    return bcrypt.compare(passwordString, hash);
  }
}
