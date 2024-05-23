"use client";

import { Suspense, useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const address = new window.kakao.maps.LatLng(37.490506, 126.993088);
        const options = {
          center: address,
          level: 4,
        };
        const marker = new window.kakao.maps.Marker({
          position: address,
        });
        const map = new window.kakao.maps.Map(container, options);
        marker.setMap(map);
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return (
    <Suspense>
      <div
        className=" mt-8 w-full md:w-1/2 h-[380px] rounded-3xl flex-shrink-0 "
        id="map"
      ></div>
    </Suspense>
  );
}
