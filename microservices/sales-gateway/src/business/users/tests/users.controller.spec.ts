import { Test, TestingModule } from '@nestjs/testing';
import { userDtoMock, userJwtMock } from '../mocks/user.mocks';
import { UsersServiceMock } from '../mocks/users.service.mock';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
	let usersController: UsersController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [UsersService],
		})
			.overrideProvider(UsersService)
			.useClass(UsersServiceMock)
			.compile();

      usersController = app.get<UsersController>(UsersController);
	});

	describe('getAll', () => {
		it('should return the users collection', async () => {
			expect(await usersController.getAll()).toEqual([userDtoMock]);
		});
	});

	describe('get', () => {
		it('should return the user', async () => {
			expect(await usersController.get(userDtoMock.id)).toEqual(userDtoMock);
		});
	});

	describe('login', () => {
		it('should return the mocked jwt', async () => {
			expect(await usersController.login(userDtoMock)).toEqual(userJwtMock);
		});
	});

	describe('create', () => {
		it('should return the created user', async () => {
			expect(await usersController.create(userDtoMock)).toEqual(userDtoMock);
		});
	});

	describe('update', () => {
		it('should return the updated user', async () => {
			expect(await usersController.update(userDtoMock.id, userDtoMock)).toEqual(userDtoMock);
		});
	});

	describe('delete', () => {
		it('should return the deleted user id', async () => {
			expect(await usersController.delete(userDtoMock.id)).toEqual(userDtoMock.id);
		});
	});
});
