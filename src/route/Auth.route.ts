import { AuthController } from '../controller/Auth.controller';

const authController = new AuthController();

export default [
  {
    method: 'post',
    route: '/api/auth/login',
    controller: AuthController,
    middleware: [],
    action: authController.login,
  },
  {
    method: 'post',
    route: '/api/auth/register',
    controller: AuthController,
    middleware: [],
    action: authController.register,
  },
];
