import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { SigninValidator } from "../../../../packages/zod/dist";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Ronak", required: true },
        phone: { label: "Phone number", type: "text", placeholder: "9545293105", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(
        credentials: Record<"username" | "phone" | "password", string> | undefined,
        req: any
      ): Promise<{ id: string; name: string | null | undefined; number: string | null | undefined } | null> {

        console.log("Received credentials:", credentials);

        const parsed = SigninValidator.safeParse({
          username: credentials?.username,
          phone: credentials?.phone,
          password: credentials?.password
        });

        if (!parsed.success) {
          console.error("Validation failed:", parsed.error.flatten().fieldErrors);
          return null;
        }

        const { username, phone, password } = parsed.data;

        const existingUser = await db.user.findFirst({
          where: { number: phone }
        });

        if (existingUser) {
          if (
            typeof password === "string" &&
            typeof existingUser.password === "string"
          ) {
            const passwordValid = await bcrypt.compare(password, existingUser.password);
            if (passwordValid) {
              return {
                id: existingUser.id?.toString() ?? "",
                name: typeof existingUser.name === "string" ? existingUser.name : existingUser.name?.toString() ?? null,
                number: typeof existingUser.number === "string" ? existingUser.number : existingUser.number?.toString() ?? null
              };
            } else {
              console.warn("Incorrect password for user:", phone);
              return null;
            }
          } else {
            console.warn("Password or stored password is not a string");
            return null;
          }
        }

        try {
          if (typeof password !== "string") {
            throw new Error("Password must be a string");
          }
          const hashedPassword = await bcrypt.hash(password, 10);

          const user = await db.user.create({
            data: {
              name: username,
              number: phone,
              password: hashedPassword
            }
          });

          return {
            id: user.id?.toString() ?? "",
            name: typeof user.name === "string" ? user.name : user.name?.toString() ?? null,
            number: typeof user.number === "string" ? user.number : user.number?.toString() ?? null
          };
        } catch (e) {
          console.error("User creation failed:", e);
          return null;
        }
      },
    })
  ],
  pages:{
    signIn:"/signin"
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    }
  }
};
