import dotenv from 'dotenv';
dotenv.config();

const environmentError = (name: string) => new Error(`Environment error: ${name} not set. Check .env file`);

if (!process.env.INFURA_URL) {
  throw environmentError('INFURA_URL');
}

if (!process.env.INFURA_WS) {
  throw environmentError('INFURA_ws');
}

if (!process.env.BLOCK_TOLERANCE) {
  throw environmentError('BLOCK_TOLERANCE');
}

export default {
  INFURA_URL: process.env.INFURA_URL || '',
  INFURA_WS: process.env.INFURA_WS || '',
  BLOCK_TOLERANCE: +process.env.BLOCK_TOLERANCE || '',
  httpConfig: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
};
