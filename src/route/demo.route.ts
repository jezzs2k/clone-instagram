import { DemoController } from '../controller/demo.controller';

const demoController = new DemoController();

export default [
  {
    method: 'post',
    route: '/api/auth/login',
    controller: DemoController,
    middleware: [],
    action: demoController.demo,
  },
];
