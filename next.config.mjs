/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    //TODO: NEXTAUTH_URL deploy한걸로 바꿔야함
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "jqiL7XaPk0WTfXPbqAFlOu3qqOns4Wlt1ncSI+sVioA=",
    KAKAO_JS_KEY: "d5fdd6e2dcb937e3fca752e4eaddb850",
    KAKAO_REDIRECT_URI:
      "https://lifeisjazz-nextjs.vercel.app/api/auth/callback/kakao",
    KAKAO_REST_KEY: "043c7a5cbbacb67d0ce5de6b65e1e062",
    KAKAO_CLIENT_SECRET_KEY: "Y9D0eiA7J13mHwBCh8Y9NtCeoq5QbjbJ",
    FIREBASE_API_KEY: "AIzaSyDoYdDaJ1kPtbZIuUKfgih4rD5DwOLp4-Y",
    FIREBASE_AUTH_DOMAIN: "life-is-jazz-web-app.firebaseapp.com",
    FIREBASE_PROJECT_ID: "life-is-jazz-web-app",
    FIREBASE_STORAGE_BUCKET: "life-is-jazz-web-app.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "457842203864",
    FIREBASE_APP_ID: "1:457842203864:web:7256f3fb28658a642bcbad",
    FIREBASE_MEASUREMENT_ID: "G-887N745BH5",
  },
};

export default nextConfig;
