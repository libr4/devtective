import crypto from 'crypto';
import { TASK_TYPES } from './constants';

export function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}

const randomStrOfSize = (size:number) => {
  const randomString = crypto.randomBytes(size).toString('hex');
  return randomString;

}

export function generateCredentials() {
  const randomString = crypto.randomBytes(4).toString('hex');
  return {
    username: `usuario_${randomString}`,
    password: `password_${randomString}`,
    email: `teste${randomString}@teste.com`,
    firstName: `Teste${randomString}`
  };
}

export function generateMockTask() {
    const randomString = crypto.randomBytes(4).toString('hex'); 
    const types = Object.values(TASK_TYPES);
    const randomNumber = getRandomInt(types.length);
    const randomType = types[randomNumber];
    return {
      title: `${randomStrOfSize(10)} ${randomStrOfSize(10)} ${randomStrOfSize(10)}`,
      description: `${randomStrOfSize(10)} ${randomStrOfSize(10)} ${randomStrOfSize(10)}
                    ${randomStrOfSize(10)} ${randomStrOfSize(10)} ${randomStrOfSize(10)}
                    ${randomStrOfSize(10)} ${randomStrOfSize(10)} ${randomStrOfSize(10)}`,
      type:randomType
    };
  }