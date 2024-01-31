import { NotFoundError } from "../../exception/notfound.error";
import { DuplicateError } from "../../exception/duplicate.error";
import { User } from "../model/user.interface";
import userRepository from "../repository/user.repository";

export class UserService {
  constructor() {}

  async getAllUsers(): Promise<User[]> {
    const users = await userRepository.getAllUsers();
    return users;
  }

  async createUser(user: any, picture: string): Promise<User> {
    const userFound = await userRepository.findUserByEmail(user.email);

    if (userFound) {
      throw new DuplicateError(`email ${user.email} is in use`);
    }

    user.picture = picture;

    const newUser: User = await userRepository.createUser(user);
    return newUser;
  }

  async findUserById(userId: number) {
    const userFound = await userRepository.findUserById(userId);

    if (!userFound) {
      throw new NotFoundError(`user not found`);
    }

    return userFound;
  }

  async updateEmailUser(userId: number, email: string) {
    const userFound = await userRepository.findUserById(userId);

    if (!userFound) {
      throw new NotFoundError(`user not found`);
    }

    await userRepository.updateEmail(userId, email);
  }
}
