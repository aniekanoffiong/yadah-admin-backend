import { TwoFactorModel } from '../twoFactor.model';

export class TwoFactorResponseDTO {
  twoFactorUrl: string;

  static toResponse(twoFactor: TwoFactorModel): TwoFactorResponseDTO {
    const twoFactorDTO = new TwoFactorResponseDTO();
    twoFactorDTO.twoFactorUrl = `/api/two-factor/${twoFactor.tempSessionToken}`;
    return twoFactorDTO;
  }
}
