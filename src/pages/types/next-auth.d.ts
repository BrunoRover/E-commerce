import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      isAdmin: boolean;
    };
    token?: string;
  }

  interface JWT {
    id: string;
    email: string;
    isAdmin: boolean;
    accessToken?: string;
  }
}
