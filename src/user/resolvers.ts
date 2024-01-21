import { UserService } from "./service/user.service";
import { User } from "./model/user.interface";

const getUser = async (args: { id: number }): Promise<User> => {
  const userService = new UserService();
  const user: User = await userService.findUserById(args.id);
  return user;
};

const getUsers = async (): Promise<User[]> => {
  const userService = new UserService();
  const users: User[] = await userService.getAllUsers();
  return users;
};

const createUser = async (args: {
  firstName: string;
  lastName: string;
  age: number;
  yearsOfExperience: number;
}): Promise<User> => {
  const userService = new UserService();
  const user: User = await userService.createUser({ ...args });
  return user;
};

const updateUserEmail = async (args: {
  id: number;
  email: string;
}): Promise<User> => {
  const userService = new UserService();
  await userService.updateEmailUser(args.id, args.email);
  const user: User = await userService.findUserById(args.id);
  return user;
};

export const root = {
  getUser,
  getUsers,
  createUser,
  updateUserEmail,
};
