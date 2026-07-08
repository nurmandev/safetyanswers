import { User, IUserDocument } from "../models/User";

export const UserRepository = {
  async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id);
  },

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email: email.toLowerCase() });
  },

  async findByEmailWithPassword(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email: email.toLowerCase() }).select("+password");
  },

  async create(data: { name: string; email: string; password: string }): Promise<IUserDocument> {
    return User.create(data);
  },

  async updateById(id: string, data: Partial<IUserDocument>): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async updatePassword(id: string, password: string): Promise<IUserDocument | null> {
    const user = await User.findById(id);
    if (!user) return null;
    user.password = password;
    user.passwordChangedAt = new Date();
    await user.save();
    return user;
  },
};
