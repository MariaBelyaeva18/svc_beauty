import { SequelizeModule } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { sequelizeConfig } from '../../sequelize/sequelize.config';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [SequelizeModule.forRoot(sequelizeConfig)],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get(AuthService);
    authController = moduleRef.get(AuthController);
  });

  describe('checkUser', () => {
    it('Должна вернуться информация о пользователе', async () => {
      const result = {
        data: {
          id: 'e1125c74-0354-4bc9-89e0-f76849d9da0c',
          name: 'Мария',
          middle_name: 'Вадимовна',
          last_name: 'Беляева',
          login: 'admin',
          phone_number: '123',
          role_id: 'admin',
        },
        message: 'Успешный вход в систему',
      };
      jest.spyOn(authService, 'checkUser').mockImplementation(async () => result);

      expect(
        await authController.checkUser({
          username: 'admin',
          password: '123',
        }),
      ).toBe(result);
    });
  });
});
