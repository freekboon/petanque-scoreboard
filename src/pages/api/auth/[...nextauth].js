import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import User from "~models/User";

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
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        const user = await User.findOne({ email: token.email });

        if (!user) {
          await User.create({
            name: token.name,
            email: token.email,
            providerId: token.sub,
          });
        }

        token.accessToken = account.access_token;
      }
      return token;
    },
    // eslint-disable-next-line no-unused-vars
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
