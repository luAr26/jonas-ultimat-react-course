/** @format */

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// const authConfig = {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
// };

const authConfig = {
  providers: [Google],
};

export const { auth, handlers } = NextAuth(authConfig);