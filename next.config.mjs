/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "jqiL7XaPk0WTfXPbqAFlOu3qqOns4Wlt1ncSI+sVioA=",
    KAKAO_JS_KEY: "d5fdd6e2dcb937e3fca752e4eaddb850",
    KAKAO_REDIRECT_URI:
      "https://lifeisjazz-nextjs.vercel.app/api/auth/callback/kakao",
    KAKAO_REST_KEY: "043c7a5cbbacb67d0ce5de6b65e1e062",
    KAKAO_CLIENT_SECRET_KEY: "Y9D0eiA7J13mHwBCh8Y9NtCeoq5QbjbJ",
  },
};

export default nextConfig;
