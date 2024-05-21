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
    FIREBASE_CLIENT_EMAIL:
      "firebase-adminsdk-3ea9x@life-is-jazz-web-app.iam.gserviceaccount.com",
    FIREBASE_PRIVATE_KEY:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCwLtr3QeCCRclj\nUM//IZMbQi/5J6vqF+JifdLBO7QYfxShC66HJnf95Jl/3fKEQg00UusKix+999en\njYJCpewGZUftB0ZTH3FQtSF57fiOsv/SqbIGZSeARDkH8HbitKf9WAkXlFDCDslQ\nnsTCmPrJ2UKNI8xzNrmESkBpQlXERqeD8GHdwGtRZfRWKfFW8Hl75oIAdxbcGNee\n0csw1JM5tOo8OpOyP4OLXYnSbKf/Pilsg1q76voCU22RKizw6hcHysxAkFXTK/5D\nTMAr/dbBIkAFinUyoBWitTo2C5atpdx4GHqHb9y234leAX0EU8XMzW+rYOS5pGjR\nmnMCKvOrAgMBAAECggEAAbb9kl1/alQD/8K193WG6BGTKxUkR5XRcJWVE8b9TbuK\nCZgeqOAYg57rLbQ74rS8gnU1OS202BfLVjaFrcfaO/w9AwEuErUYASIYb68C20X6\nG2k39R/UulNvqmA9KGE9UwAnsy7I44OfbUOgSuMgAE3TUDiDP1UZrydiJwNXqjeN\nfmec9rzz7WT6vevVf28j/GyTwTjiaxRoBJ593VF3Als7FfVo86FvWGztBGWzfqqE\nXFLNFUNdGvhCLTUAYZXav3xDis9pkHgg6HlfwLJuvUJ8TYR6CEFMwsL6bE7BxwwG\n4d25Mx7Ch2erbwLTI4Whd42EI9sbruTpSpktGaaH4QKBgQDjzZUpakx8vwLn58jD\nK9NScpfwaM1Yc4TOYAf447g4/Gy8gYpyRBgDKPe9yHrta7s50KJm0IJvG2k+KVoy\nu/79z9SFZcrfMV+9rkIy89N3GKARf4CS0iSnCm/ICZCo1pr4XU5ZZDeu0iZumqWa\nUXbDf+jsiW3yBTwnj5VwKC7nsQKBgQDF/ZV4meqJe6z8SmGR8/am4hVSbdqnlhFK\nVDTrcizQDD4saPrS6On69DJqW0DalY/0LPfe/sbdMBNCCENupBSYbma077Ao991W\npf/NBaQV6tVnREAKADwuixBHXIJGg8+IQzBEIryIuUo0z7TNqTTYmJMdzw7OJ0Cv\nAhbAY2XEGwKBgQDTkSFRP3od+UB3pNrd+Jvg3LCkBJGB7nePO7zruIJl2noacKzm\nBrvOY4QC7GjOi9lsjonltw0Mp4aMxtcQe20MyLJ12d4af76NaYPt0mm5GFPBLIt6\n0FReFuFOBSQmynlO5UlY2Cym3mH3IwVeVv5X/zmSROipd5cwnreJXKiDYQKBgQCS\nTayiDbqOFWHinGQ1If3lm7L90kd9BxuHvWnNgfUzV5ip4HlYWNxtoP2QMhZeb56M\nZJ5Vnhb9Y4UXilup6n19ljc3BNc7rs1UNh4sNjrmJz3CrWBVA491JTXGRcnOqaA1\npNCJyNFghusa01Fbl+mBFF3B7TuXgtH9gKGnUMvmeQKBgBVrsrU7Mqtw5Httlzqx\n19p8WjuGw+e7wPi6GpCbhyjVkV4XYWvFAtfX9/VU/H46zPsiYcjWDmnaEBGzVcC/\nqUK64tPpa9uSEMZnKsS/p3R5Oxv6sWfT6gRrFTGjfP7RMH7AsZnUJZdhfYo1HQ2Z\neBDTlo3WVsenNbcA3klF8R/k\n-----END PRIVATE KEY-----\n",
  },
};

export default nextConfig;
