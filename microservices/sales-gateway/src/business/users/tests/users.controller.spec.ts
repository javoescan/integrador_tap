import { Test, TestingModule } from "@nestjs/testing";
import userMock from "../mocks/user.mock";
import { UsersServiceMock } from "../mocks/users.service.mock";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";

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

	describe('get', () => {
		it('should return the user', async () => {
			const id = 'test';
			expect(await usersController.get(id)).toEqual(userMock);
		});
	});
});
