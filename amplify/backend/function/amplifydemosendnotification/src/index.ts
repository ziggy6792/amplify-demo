/* eslint-disable import/prefer-default-export */
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	MY_ENV_PARAM
Amplify Params - DO NOT EDIT */

import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_CONFIG = {
  APT_KEY: '1985947273:AAF5rzAk6Pt0jzwkjoGWjzOQ2NbTRRKqcBE',
  CHAT_ID: '-520673898',
};

const bot = new TelegramBot(TELEGRAM_CONFIG.APT_KEY, { polling: false });

const sendNotification = async (message: string, chatId = TELEGRAM_CONFIG.CHAT_ID, isMarkDown = true): Promise<TelegramBot.Message> => {
  let result: TelegramBot.Message;
  try {
    result = await bot.sendMessage(chatId, message, { parse_mode: isMarkDown ? 'Markdown' : undefined, disable_web_page_preview: true });
    console.log({ result });
  } catch (err) {
    console.log({ err });
  }
  return result;
};

export const handler = async (event: any) => {
  const isLocal = process.env.AWS_EXECUTION_ENV === 'AWS_Lambda_amplify-mock';
  const isProd = process.env.ENV === 'prod';

  console.log('isLocal', isLocal);
  console.log('isProd', isProd);
  console.log('Hello World bla bla bla');
  await sendNotification('hello from lambda');

  // TODO implement
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
