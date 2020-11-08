import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from '../users/enums/roles.enums';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async generateJwt(id: string, email: string, role: UserRoles): Promise<any> {
		return this.jwtService.sign({ id, email, role });
	}
}
