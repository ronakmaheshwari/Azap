import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { SigninValidator } from "../../../../packages/zod/dist";

interface CredentialsSchema {
  username: string;
  phone: string;
  password: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Ronak", required: true },
        phone: { label: "Phone number", type: "text", placeholder: "9545293105", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials: Record<"username" | "phone" | "password", string> | undefined) {
        console.log("Received credentials:", credentials);
        const parsed = SigninValidator.safeParse({
            username:credentials?.username,
            phone:credentials?.phone,
            password:credentials?.password
        });
        if (!parsed.success) {
          console.error("Validation failed:", parsed.error.flatten());
          return null;
        }

        const { username, phone, password } = parsed.data;

        const existingUser = await db.user.findFirst({
          where: { number: phone }
        });

        if (existingUser) {
          const passwordValid = await bcrypt.compare(password, existingUser.password);
          if (passwordValid) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              number: existingUser.number
            };
          } else {
            console.warn("Incorrect password for user:", phone);
            return null;
          }
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);

          const user = await db.user.create({
            data: {
              name: username,
              number: phone,
              password: hashedPassword
            }
          });

          return {
            id: user.id.toString(),
            name: user.name,
            number: user.number
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
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    }
  }
};
