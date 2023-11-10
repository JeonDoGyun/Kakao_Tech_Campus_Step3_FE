import { useState, useRef, useEffect } from 'react';
import AutoplayGuideModal from 'commons/modals/SafariAutoplayGuideModal';
import VideoOverlay from './VideoOverlay';
import { HomeVideoProps, VideoOverlayProps } from '../homeType';

const HomeVideo = (props: HomeVideoProps) => {
  const {
    url,
    muted,
    handleDoubleClick,
    hovering,
    setHovering,
    playing,
    setPlaying,
    index,
  } = props;
  const [opacity, setOpacity] = useState(1);
  const videoRef = useRef(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const browserInfo = window.navigator.userAgent.toLowerCase();

  useEffect(() => {
    if (videoPlayerRef.current) {
      // 음소거 상태로 만들기
      videoPlayerRef.current.defaultMuted = true;
      videoPlayerRef.current.playsInline = true;
    }
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && playing) {
          const playPromise = videoPlayerRef.current?.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // 이 때, 비디오가 재생됨.
                setLoading(false);
              })
              .catch(() => {
                // 재생 정지됨. 사용자가 직접 재생 버튼을 눌러야 함.
              });
          }
        } else {
          videoPlayerRef.current?.pause();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [playing]);

  const handleVideoClick = () => {
    setPlaying(!playing);
    if (videoPlayerRef.current && videoPlayerRef.current.paused) {
      videoPlayerRef.current.play();
    } else if (videoPlayerRef.current && !videoPlayerRef.current.paused) {
      videoPlayerRef.current.pause();
    }
  };
  const handleMouseEnter = () => {
    setHovering(true);
    setOpacity(1);
    setTimeout(() => {
      setHovering(false);
    }, 1500);
    setTimeout(() => {
      setOpacity(0);
    }, 1300);
  };
  const videoOverlayProps: VideoOverlayProps = {
    opacity,
    hovering,
    loading,
    playing,
    index,
  };
  return (
    <>
      <div
        ref={videoRef}
        onClick={handleVideoClick}
        onDoubleClick={handleDoubleClick}
        className="h-[70vh] flex flex-col items-center justify-center"
        onMouseEnter={handleMouseEnter}
      >
        <VideoOverlay {...videoOverlayProps} />
        {loading && index !== 0 && playing && (
          <div className="w-10 h-10 loader top-1/2 absolute" />
        )}
        <video
          className="w-full h-full"
          ref={videoPlayerRef}
          muted={muted}
          autoPlay={playing}
          loop
          playsInline
        >
          <source src={url} type="video/mp4" />
        </video>
      </div>
      <AutoplayGuideModal browserInfo={browserInfo} />
    </>
  );
};

export default HomeVideo;
