import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: '1h',
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [JwtStrategy, AuthService],
	exports: [AuthService]
})
export class AuthModule {}
