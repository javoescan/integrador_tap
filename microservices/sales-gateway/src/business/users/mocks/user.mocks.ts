import { UserDto } from '../dtos/user.dto';

const userDtoMock = new UserDto();
userDtoMock.id = 'test_id';
userDtoMock.email = 'test_email';
userDtoMock.firstName = 'test_firstName';
userDtoMock.lastName = 'test_lastName';
userDtoMock.document = 'test_document';
userDtoMock.role = 'test_role';

const userJwtMock = 'test_jwt';

export {
  userDtoMock,
  userJwtMock,
};