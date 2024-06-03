import crypto from 'crypto';

export function generateCredentials() {
  const randomString = crypto.randomBytes(4).toString('hex');
  return {
    username: `usuario_${randomString}`,
    password: `password_${randomString}`,
    email: `teste${randomString}@teste.com`,
    firstName: `Teste${randomString}`
  };
}