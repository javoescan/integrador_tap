export class UserModel {
  constructor(
    private email: string,
    private password: string,
    private firstName: string,
    private lastName: string,
    private document: string,
    private role: string,
    private id?: string
  ) {
    if (!email || !password || !firstName || !lastName || !document || !role) {
      throw new Error('Missing params');
    }
  }
}