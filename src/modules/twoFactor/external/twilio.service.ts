import dotenv from 'dotenv';
import { TwilioResponseDto } from '../dtos/twilioResponse.dto';

dotenv.config();

const baseApi = process.env.TWILIO_BASE_API;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER as string;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiSid = process.env.TWILIO_API_SID;
const apiSecret = process.env.TWILIO_API_SECRET;
const messageEndpoint = `/2010-04-01/Accounts/${accountSid}/Messages.json`;

const TwilioService = {
  sendMessage: async function (mobileNumber: string, message: string): Promise<TwilioResponseDto> {
    const fetchData = await fetch(`${baseApi}${messageEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${apiSid}:${apiSecret}`)}`,
      },
      body: new URLSearchParams({
        Body: message,
        To: mobileNumber,
        From: phoneNumber,
      }),
    });
    return await fetchData.json();
  },
};

export default TwilioService;
