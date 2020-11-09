import { Injectable } from "@nestjs/common";
import { UserModel } from "../user.model";
import userMock from "./user.mock";

@Injectable()
export class UsersServiceMock {
	async get(id: string): Promise<UserModel> {
		return userMock;
	}
}