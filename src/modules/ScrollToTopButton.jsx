"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/header.css";
import Header from "./../components/Header";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Убираем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Функция для прокрутки страницы вверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`scroll-to-top cursor-pointer hover:opacity-75 ${
        isVisible ? "visible" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <Image src="/top-arrow.svg" width={11} height={5} alt="Scroll to top" />
    </div>
  );
};

export default ScrollToTopButton;
