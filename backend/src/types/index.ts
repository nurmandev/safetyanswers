import { Request } from "express";
import { Role } from "../constants";

export interface JwtPayload {
  sub: string;
  role: Role;
  type: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}
