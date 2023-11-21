"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import * as faceapi from "face-api.js";
const TEST_IMAGE = {
  src: "https://image.ytn.co.kr/general/jpg/2017/1114/201711141710070596_d.jpg",
  alt: "The lord of the rings",
  width: 640,
  height: 360,
};

export default function Home() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [detectedPeople, setDetectedPeople] = useState(0);
  const loadModel = async () =>
    await faceapi.nets.tinyFaceDetector.loadFromUri("/static/model");
  // detectFace();

  const detectFace = async () => {
    if (imgRef.current === null) return;
    await loadModel();
    const options = new faceapi.TinyFaceDetectorOptions();
    const detections = await faceapi.detectAllFaces(imgRef.current, options);
    setDetectedPeople(detections.length);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Example For testing face-api.js</h1>
      <Image
        src={TEST_IMAGE.src}
        width={TEST_IMAGE.width}
        height={TEST_IMAGE.height}
        alt={TEST_IMAGE.alt}
        ref={imgRef}
        onLoad={detectFace}
      />
      <p>{detectedPeople} people are detected</p>
    </main>
  );
}
