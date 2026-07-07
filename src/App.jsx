import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import DogCard from './components/DogCard';
import InputForm from './components/InputForm';
import DownloadButton from './components/DownloadButton';
import './App.css';

const INITIAL_DOG_INFO = {
  nameKo: '',
  nameEn: '',
  regNumber: '',
  breed: '',
  breedCustom: false,
  gender: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  guardian: '',
  photo: null,
};

export default function App() {
  const [dogInfo, setDogInfo] = useState(INITIAL_DOG_INFO);
  const cardRef = useRef(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement('a');
      const fileName = dogInfo.nameKo
        ? `강아지등록증_${dogInfo.nameKo}.png`
        : '강아지등록증.png';
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('다운로드 실패:', err);
      alert('이미지 다운로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // Generate spine rings for notebook decoration
  const spineRings = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className="spine-ring" />
  ));

  return (
    <div className="app">
      {/* Pink curtain header */}
      <div className="curtain">
        <div className="curtain-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curtainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F4A6C0" />
                <stop offset="60%" stopColor="#F0A0B8" />
                <stop offset="100%" stopColor="#E8909A" />
              </linearGradient>
            </defs>
            {/* Curtain scallop shape */}
            <path
              d="M0,0 L1200,0 L1200,70
                 Q1140,110 1080,70
                 Q1020,110 960,70
                 Q900,110 840,70
                 Q780,110 720,70
                 Q660,110 600,70
                 Q540,110 480,70
                 Q420,110 360,70
                 Q300,110 240,70
                 Q180,110 120,70
                 Q60,110 0,70 Z"
              fill="url(#curtainGrad)"
            />
            {/* Subtle highlight lines for crayon texture */}
            <path
              d="M0,10 Q300,15 600,10 Q900,5 1200,12"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0,25 Q300,30 600,25 Q900,20 1200,27"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M0,40 Q300,45 600,40 Q900,35 1200,42"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Notebook spine decoration */}
      <div className="notebook-spine">{spineRings}</div>

      {/* Decorative scratches */}
      <div className="deco-scratch deco-scratch-1" />
      <div className="deco-scratch deco-scratch-2" />
      <div className="deco-scratch deco-scratch-3" />

      {/* Main content */}
      <div className="main-content">
        <h1 className="page-title">
          내 강아지의 주민등록증을 발급하세요 ~{' '}
          <span className="emoji">🐶</span>
        </h1>

        <div className="content-layout">
          {/* Card preview */}
          <DogCard ref={cardRef} dogInfo={dogInfo} />

          {/* Input form */}
          <InputForm dogInfo={dogInfo} onChange={setDogInfo} />
        </div>

        {/* Download button */}
        <DownloadButton onClick={handleDownload} />
      </div>
    </div>
  );
}
