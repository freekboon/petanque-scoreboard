import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import User from "~models/User";
import connectDB from "~lib/mongoose";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const user = await User.findOne({ email: token.email });

        if (!user) {
          return false;
        }

        // Disabled improvised registration flow.
        // await User.updateOne(
        //   { email: token.email },
        //   {
        //     name: token.name,
        //     providerId: token.sub,
        //   }
        // );

        token.accessToken = account.access_token;
      }
      return token;
    },
    // eslint-disable-next-line no-unused-vars
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default connectDB(NextAuth(authOptions));
