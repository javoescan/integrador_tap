import { UserDto } from '../user.dto';

const userDtoMock = new UserDto();
userDtoMock.id = 'test_id';
userDtoMock.email = 'test_email';
userDtoMock.firstName = 'test_firstName';
userDtoMock.lastName = 'test_lastName';
userDtoMock.document = 'test_document';
userDtoMock.role = 'test_role';

export default userDtoMock;