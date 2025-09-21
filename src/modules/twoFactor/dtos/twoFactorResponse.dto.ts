import { TwoFactor } from '../twoFactor.entity';

export class TwoFactorResponseDTO {
  twoFactorUrl!: string;

  static toResponse(twoFactor: TwoFactor): TwoFactorResponseDTO {
    const twoFactorDTO = new TwoFactorResponseDTO();
    twoFactorDTO.twoFactorUrl = `/api/two-factor/${twoFactor.tempSessionToken}`;
    return twoFactorDTO;
  }
}
