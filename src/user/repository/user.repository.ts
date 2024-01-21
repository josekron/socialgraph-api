import { User } from "../model/user.interface";

interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  createUser(user): Promise<User>;
  findUserById(userId: number): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  updateEmail(userId: number, email: string);
}

class UserRepository implements IUserRepository {
  async getAllUsers(): Promise<User[]> {
    try {
      const users: User[] = await User.findAll();
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async createUser(user): Promise<User> {
    let newUser: User;
    try {
      newUser = await User.create(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
    return newUser;
  }

  async findUserById(userId: number): Promise<User> {
    const user: User = await User.findByPk(userId);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user: User = await User.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }

  async updateEmail(userId: number, email: string) {
    await User.update(
      { email: email },
      {
        where: {
          id: userId,
        },
      }
    );
  }
}

export default new UserRepository();
