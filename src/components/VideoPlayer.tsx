import React, { useRef, useEffect } from "react";

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleScroll = () => {
    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (isVisible) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <video ref={videoRef} src={videoUrl} controls muted />;
};

export default VideoPlayer;
