import { TwoFactorModel } from '../twoFactor.model';

export class TwoFactorPasswordResponseDTO {
  twoFactorUrl: string;

  static toResponse(twoFactor: TwoFactorModel): TwoFactorPasswordResponseDTO {
    const twoFactorDTO = new TwoFactorPasswordResponseDTO();
    twoFactorDTO.twoFactorUrl = `/api/password-reset/${twoFactor.tempSessionToken}`;
    return twoFactorDTO;
  }
}
