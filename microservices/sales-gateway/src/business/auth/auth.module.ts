import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminAuthGuard } from './admin.auth.guard';
import { BasicAuthGuard } from './basic.auth.guard';

@Global()
@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: '3h',
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [JwtStrategy, AdminAuthGuard, BasicAuthGuard],
	exports: [AdminAuthGuard, BasicAuthGuard],
})
export class AuthModule {}
