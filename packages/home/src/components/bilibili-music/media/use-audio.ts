import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { UseAudioOptions } from './types';

function createAudio() {
  const audio = new Audio();
  audio.volume = 0.5;
  return audio;
}

export default function useAudio(options: UseAudioOptions = {}) {
  const { onEvent } = options;
  const audioRef = useRef(createAudio());

  const [canplay, setCanplay] = useState(false);
  const [canplaythrough, setCanplaythrough] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [ended, setEnded] = useState(false);

  const info = useMemo(() => {
    return {
      canplay,
      canplaythrough,
      playing,
      currentTime,
      duration,
      volume,
      ended,
    };
  }, [canplay, canplaythrough, playing, currentTime, duration, volume, ended]);

  const reset = useCallback(() => {
    setCanplay(false);
    setCanplaythrough(false);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setEnded(false);
  }, []);

  const load = useCallback(
    (url: string) => {
      reset();
      audioRef.current.src = url;
      audioRef.current.load();
    },
    [reset],
  );

  const play = useCallback(
    async (url = '') => {
      if (url) {
        load(url);
      }
      return audioRef.current.play();
    },
    [load],
  );

  const pause = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const updateVolume = useCallback((target: number) => {
    audioRef.current.volume = target;
  }, []);

  const updateTime = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    if (!isNaN(currentTime) && currentTime >= 0) {
      setCurrentTime(currentTime);
    }
    if (!isNaN(duration) && duration >= 0) {
      setDuration(duration);
    }
  }, []);

  const destroy = useCallback(() => {
    reset();
    audioRef.current?.pause();
    audioRef.current.src = '';
    audioRef.current.load();
  }, [reset]);

  useEffect(() => {
    const mount = () => {
      const handleOnCanPlay = () => {
        setCanplay(true);
        updateTime();
        onEvent?.('canplay');
      };

      const handleOnCanPlayThrough = () => {
        setCanplaythrough(true);
        updateTime();
        onEvent?.('canplaythrough');
      };

      const handleOnPlay = () => {
        setPlaying(true);
        onEvent?.('play');
      };

      const handleOnPause = () => {
        setPlaying(false);
        onEvent?.('pause');
      };

      const handleOnTimeupdate = () => {
        updateTime();
        onEvent?.('timeupdate');
      };

      const handleOnVolumechange = () => {
        const currentVolume = audioRef.current.volume;
        if (!isNaN(currentVolume) && currentVolume >= 0) {
          setVolume(currentVolume); // React state updated here
        }
        onEvent?.('volumechange');
      };

      const handleOnEnded = () => {
        setEnded(true);
        onEvent?.('ended');
      };

      audioRef.current.addEventListener('canplay', handleOnCanPlay);
      audioRef.current.addEventListener('canplaythrough', handleOnCanPlayThrough);
      audioRef.current.addEventListener('play', handleOnPlay);
      audioRef.current.addEventListener('pause', handleOnPause);
      audioRef.current.addEventListener('timeupdate', handleOnTimeupdate);
      audioRef.current.addEventListener('volumechange', handleOnVolumechange);
      audioRef.current.addEventListener('ended', handleOnEnded);

      return () => {
        audioRef.current.removeEventListener('canplay', handleOnCanPlay);
        audioRef.current.removeEventListener('canplaythrough', handleOnCanPlayThrough);
        audioRef.current.removeEventListener('play', handleOnPlay);
        audioRef.current.removeEventListener('pause', handleOnPause);
        audioRef.current.removeEventListener('timeupdate', handleOnTimeupdate);
        audioRef.current.removeEventListener('volumechange', handleOnVolumechange);
        audioRef.current.removeEventListener('ended', handleOnEnded);
      };
    };
    const unbind = mount();

    return () => {
      unbind();
    };
  }, [updateTime, onEvent]);

  return {
    info,
    load,
    play,
    pause,
    updateVolume,
    destroy,
  };
}
