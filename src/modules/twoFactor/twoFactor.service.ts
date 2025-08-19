import { User } from '../user/entities/user.entity';
import crypto from 'crypto';
import twilioService from './external/twilio.service';
import { TwilioResponseDto } from './dtos/twilioResponse.dto';
import twoFactorRepository from './twoFactor.repository';
import AuthenticationFailedException from '../../exceptions/authenticationFailed.exception';
import { TwoFactorPurposeEnum } from '../../enum/twoFactorPurpose.enum';
import { TwoFactor } from './twoFactor.entity';

export class TwoFactorService {
  async sendLoginToken(user: User): Promise<TwoFactor> {
    const twoFactorCode = this._generateTwoFactorCode();
    console.info(`Generated 2FA code ${twoFactorCode} for user with email ${user.email}`);
    const smsMessage = this._generateSmsMessage(twoFactorCode);
    if (user.mobile) {
      const messageResponse = await twilioService.sendMessage(user.mobile, smsMessage);
      console.info(`Attempting to send SMS message with response ${JSON.stringify(messageResponse)}`);
      if (this._validMessageResponse(messageResponse)) {
        const tempIdentifierToken = this._generateTemporaryToken();
        return await twoFactorRepository.createRecord(twoFactorCode, tempIdentifierToken, user.id);
      }
      console.error(`Failed to complete authentication after attempting to send SMS ${JSON.stringify(messageResponse)}`);
    }
    throw new AuthenticationFailedException();
  }

  async sendPasswordResetToken(user: User, hashPassword: string): Promise<TwoFactor> {
    const twoFactorCode = this._generateTwoFactorCode();
    console.info(`Generated 2FA code ${twoFactorCode} for password reset for user with email ${user.email}`);
    const smsMessage = this._generatePasswordMessage(twoFactorCode);
    if (user.mobile) {
      const messageResponse = await twilioService.sendMessage(user.mobile, smsMessage);
      console.info(`Attempting to send SMS message with response ${JSON.stringify(messageResponse)}`);
      if (this._validMessageResponse(messageResponse)) {
        const tempIdentifierToken = this._generateTemporaryToken();
        return await twoFactorRepository.createRecord(
          twoFactorCode,
          tempIdentifierToken,
          user.id,
          TwoFactorPurposeEnum.PASSWORD_UPDATE,
          hashPassword,
        );
      }
      console.error(`Failed to complete authentication after attempting to send SMS ${JSON.stringify(messageResponse)}`);
    }
    throw new AuthenticationFailedException();
  }

  _generateTwoFactorCode(): string {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  _generateSmsMessage(twoFactorCode: string): string {
    return `
Your login code is ${twoFactorCode}.

Please provide this code in the next step to complete your login.
    `;
  }

  _generatePasswordMessage(twoFactorCode: string): string {
    return `
Your password reset code is ${twoFactorCode}.
  
Please provide this code in the next step to complete your password reset.
    `;
  }

  _validMessageResponse(messageResponse: TwilioResponseDto): boolean {
    return ['queued', 'sent', 'delivered'].includes(messageResponse.status);
  }

  _generateTemporaryToken(): string {
    return crypto.randomBytes(30).toString('base64url');
  }
};
