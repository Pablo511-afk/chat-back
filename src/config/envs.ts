import 'dotenv/config';
import * as joi from 'joi';
import { IEnvVarsInterface } from 'src/interfaces/env-vars.interface';

const envsSchema = joi
  .object({
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PORT: joi.string().required(),
    POSTGRES_DB: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: IEnvVarsInterface = value;

export const envs = {
  jwtSecret: envsVars.JWT_SECRET,
};
