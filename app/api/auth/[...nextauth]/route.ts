import NextAuth, { Session, SessionStrategy } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { JWT } from "next-auth/jwt";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}

const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_JS_KEY!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET_KEY!,
    }),
  ],
  callbacks: {
    jwt({
      token,
      trigger,
      session,
    }: {
      token: JWT;
      trigger?: "signIn" | "update" | "signUp" | undefined;
      session?: any;
    }) {
      if ((trigger = "update" && session?.name)) {
        token.name = session.name;
      }
      return token;
    },
    async session({
      session,
      trigger,
      newSession,
    }: {
      session: any;
      trigger?: "signIn" | "update" | "signUp" | undefined;
      newSession?: any;
    }) {
      if (trigger === "update" && newSession.name) {
        session.name = newSession.name;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }),
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
