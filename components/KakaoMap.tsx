"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`;
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
    <div
      className=" mt-8 w-1/2 h-[400px] rounded-3xl flex-shrink-0 "
      id="map"
    ></div>
  );
}
