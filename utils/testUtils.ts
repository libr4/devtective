import crypto from 'crypto';

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
    return {
      title: `${randomStrOfSize(10)} ${randomStrOfSize(10)} ${randomStrOfSize(10)}`,
      description: `${randomStrOfSize(10)} ${randomStrOfSize(10)} ${randomStrOfSize(10)}
                    ${randomStrOfSize(10)} ${randomStrOfSize(10)} ${randomStrOfSize(10)}
                    ${randomStrOfSize(10)} ${randomStrOfSize(10)} ${randomStrOfSize(10)}`,
      type:"Error"
    };
  }