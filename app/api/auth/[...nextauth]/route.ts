import NextAuth, { Session } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
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
    // async jwt({
    //   token,
    //   trigger,
    //   session,
    // }: {
    //   // JSON Web Token
    //   token: JWT;
    //   trigger?: "signIn" | "update" | "signUp" | undefined;
    //   session?: any;
    // }) {
    //   if ((trigger = "update" && session?.name)) {
    //     // token.name = session.name;
    //     // token.picture = session.image;
    //     // token.sub = session.isManager;
    //     // console.log(session, "세션");
    //   }
    //   return token;
    // },
    async session({
      session,
      trigger,
      newSession,
    }: {
      session: Session;
      trigger?: "signIn" | "update" | "signUp" | undefined;
      newSession?: Session["user"];
    }) {
      if (trigger === "update" && newSession?.name) {
        session.user.name = newSession.name;
        session.user.image = newSession.image;
        session.user.isManager = newSession.isManager;
      }
      return session;
    },
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
