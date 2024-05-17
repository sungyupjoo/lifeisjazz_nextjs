import NextAuth, { Session } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { JWT } from "next-auth/jwt";

const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_JS_KEY as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET_KEY as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user) {
        console.log(session.user, "세션 유저");
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
