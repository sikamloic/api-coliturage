const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, `../.${process.env.NODE_ENV}.env`) });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MYSQL_HOST: Joi.string().required().description('MySQL host'),
    MYSQL_PORT: Joi.number().default(3306),
    MYSQL_DATABASE: Joi.string().required().description('MySQL database name'),
    MYSQL_USERNAME: Joi.string().required().description('MySQL username'),
    MYSQL_PASSWORD: Joi.string().required().allow('').description('MySQL password'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(1440).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(3).description('days after which refresh tokens expire'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysql: {
    host: envVars.MYSQL_HOST,
    port: envVars.MYSQL_PORT,
    database: envVars.MYSQL_DATABASE,
    username: envVars.MYSQL_USERNAME,
    password: envVars.MYSQL_PASSWORD,
    sequelizeOptions: {
    }
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
