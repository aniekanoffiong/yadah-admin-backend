import { TwoFactor } from '../twoFactor.entity';

export class TwoFactorPasswordResponseDTO {
  twoFactorUrl!: string;

  static toResponse(twoFactor: TwoFactor): TwoFactorPasswordResponseDTO {
    const twoFactorDTO = new TwoFactorPasswordResponseDTO();
    twoFactorDTO.twoFactorUrl = `/api/password-reset/${twoFactor.tempSessionToken}`;
    return twoFactorDTO;
  }
}
