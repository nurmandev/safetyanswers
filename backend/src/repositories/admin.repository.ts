import { Admin, IAdminDocument } from "../models/Admin";

export const AdminRepository = {
  async findById(id: string): Promise<IAdminDocument | null> {
    return Admin.findById(id);
  },

  async findByEmail(email: string): Promise<IAdminDocument | null> {
    return Admin.findOne({ email: email.toLowerCase() });
  },

  async findByEmailWithPassword(email: string): Promise<IAdminDocument | null> {
    return Admin.findOne({ email: email.toLowerCase() }).select("+password");
  },

  async create(data: { name: string; email: string; password: string; role?: string }): Promise<IAdminDocument> {
    return Admin.create(data);
  },
};
