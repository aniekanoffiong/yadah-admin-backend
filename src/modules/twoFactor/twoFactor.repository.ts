import InvalidTwoFactorException from '../../exceptions/InvalidTwoFactor.exception';
import { AppDataSource } from '../../db/data-source';
import { TwoFactor } from './twoFactor.entity';
import { TwoFactorModel } from './twoFactor.model';
import { TwoFactorPurposeEnum } from '../../enum/twoFactorPurpose.enum';
import { ObjectId } from 'typeorm';

const twoFactorRepository = AppDataSource.getMongoRepository(TwoFactor).extend({
  createRecord: async function (
    code: string,
    temporaryToken: string,
    userId: ObjectId,
    purpose: TwoFactorPurposeEnum = TwoFactorPurposeEnum.LOGIN,
    hashPassword: string | null = null,
  ): Promise<TwoFactorModel> {
    const twoFactorData: TwoFactor = await twoFactorRepository.create({
      tempSessionToken: temporaryToken,
      code,
      expireAt: twoFactorRepository._calculateExpiry(),
      purpose,
      userId,
      hashPassword,
    });
    const twoFactor = await twoFactorRepository.save(twoFactorData);
    console.info(`Successfully saved twoFactor data - ${JSON.stringify(twoFactor)} for userId ${userId}`);
    return new TwoFactorModel(
      twoFactor._id,
      twoFactor.tempSessionToken,
      twoFactor.code,
      twoFactor.expireAt,
      twoFactor.userId,
      twoFactor.hashPassword,
    );
  },

  validateTwoFactor: async function (
    code: string,
    temporaryToken: string,
    checkHashPassword: boolean = false,
  ): Promise<TwoFactorModel> {
    const twoFactor = await twoFactorRepository._fetchRecord(code, temporaryToken, checkHashPassword);
    if (twoFactor) {
      console.info(`Updating twoFactor record with id ${twoFactor._id} to status "completed"`, twoFactor);
      await twoFactorRepository._updateRecord(twoFactor, { status: 'completed' });
      return new TwoFactorModel(
        twoFactor._id,
        twoFactor.tempSessionToken,
        twoFactor.code,
        twoFactor.expireAt,
        twoFactor.userId,
        twoFactor.hashPassword,
      );
    }
    throw new InvalidTwoFactorException();
  },

  _fetchRecord: async function (
    twoFactorCode: string,
    temporaryToken: string,
    checkHashPassword: boolean,
  ): Promise<TwoFactor | null> {
    return await twoFactorRepository.findOne({
      where: {
        code: { $eq: twoFactorCode },
        tempSessionToken: { $eq: temporaryToken },
        status: { $eq: 'pending' },
        expireAt: { $gt: new Date() },
        hashPassword: checkHashPassword ? { $ne: null } : { $eq: null },
      },
    });
  },

  _updateRecord: async function (twoFactor: TwoFactor, data: Record<string, string>): Promise<void> {
    await twoFactorRepository.updateOne({ _id: { $eq: twoFactor._id } }, { $set: data });
  },

  _calculateExpiry: function () {
    const currentTimeAsMs = Date.now();
    const addedTime = Number(process.env.TOKEN_EXPIRY_MILLISECONDS) || 900000; // default to 15 minutes
    return new Date(currentTimeAsMs + addedTime);
  },
});

export default twoFactorRepository;
