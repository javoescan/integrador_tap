import { UserRoles } from '../enums/roles.enums';
import { User } from '../users.entity';

const userMock = new User();
userMock.id = 'test_id';
userMock.email = 'test_email';
userMock.firstName = 'test_firstName';
userMock.lastName = 'test_lastName';
userMock.document = 'test_document';
userMock.password = 'test_password';
userMock.role = UserRoles.SELLER;

const userJwtMock = 'test_jwt';

export {
  userMock,
  userJwtMock,
};