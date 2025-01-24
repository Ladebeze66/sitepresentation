"use client";

import { useEffect } from 'react';
import styles from './IntroAnimation.module.css';

const IntroAnimation = () => {
  useEffect(() => {
    const canvas = document.getElementById("matrix-effect");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(10, 20, 40, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(drawMatrix, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="intro-animation" className={styles.introAnimation}>
      <div className={styles.welcomeMessage}>
        <h1>Welcome</h1>
      </div>
      <canvas id="matrix-effect"></canvas>
    </div>
  );
};

export default IntroAnimation;
