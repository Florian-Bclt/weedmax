import NextAuth, { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    name?: string;
    role: string;
  }
}
