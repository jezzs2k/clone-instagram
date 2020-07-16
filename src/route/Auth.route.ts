import { AuthController } from '../controller/Auth.controller';
import { checkToken } from '../middleware/auth.middleware';

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
  {
    method: 'get',
    route: '/api/auth/verify',
    controller: AuthController,
    middleware: [checkToken],
    action: authController.checkToken,
  },
];
