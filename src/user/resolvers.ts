import { User } from "./model/user.interface";
import { AvatarService } from "./service/avatar.service";

const getUser = async (args: { id: number }, context): Promise<User> => {
  const user: User = await context.userService.findUserById(args.id);
  return user;
};

const getUsers = async (context): Promise<User[]> => {
  const users: User[] = await context.userService.getAllUsers();
  return users;
};

const createUser = async (
  args: {
    firstName: string;
    lastName: string;
    age: number;
    yearsOfExperience: number;
  },
  context
): Promise<User> => {
  const avatarService = new AvatarService();
  const picture = await avatarService.getRandomAvatar();

  const user: User = await context.userService.createUser({ ...args }, picture);
  return user;
};

const updateUserEmail = async (
  args: {
    id: number;
    email: string;
  },
  context
): Promise<User> => {
  await context.userService.updateEmailUser(args.id, args.email);
  const user: User = await context.userService.findUserById(args.id);
  return user;
};

export const resolvers = {
  getUser,
  getUsers,
  createUser,
  updateUserEmail,
};
