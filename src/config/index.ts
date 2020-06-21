import dotenv from 'dotenv';
dotenv.config();
import dev from './dev';
import staging from './staging';
const env = process.env.APP_ENV;

const config = {
  dev,
  staging,
};

export default config[env];
