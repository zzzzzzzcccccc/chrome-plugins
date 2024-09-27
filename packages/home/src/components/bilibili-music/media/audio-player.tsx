import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, IconButton, Slider } from '@mui/material';
import useAudio from './use-audio';
import { AudioPlayerProps, AudioPlayerRef } from './types';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import styles from './audio-player.module.css';

function formatDuration(value: number) {
  const minute = Math.floor(value / 60);
  const secondLeft = Math.floor(value - minute * 60);
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>((props, ref) => {
  const { url, title, pic, onPrev, onNext } = props;
  const { info, play, pause, updateVolume, destroy } = useAudio({
    onEvent: onAudioEvent,
  });

  const handleOnPrev = () => {
    onPrev?.();
  };

  const handleOnNext = () => {
    onNext?.();
  };

  const toggle = () => {
    if (info.playing) {
      pause();
    } else {
      play();
    }
  };

  const handleOnVolumeChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      updateVolume(value);
    }
  };

  function onAudioEvent(name: string) {
    if (name === 'ended') {
      handleOnNext();
    }
  }

  useEffect(() => {
    return () => {
      destroy();
    };
  }, [destroy]);

  useEffect(() => {
    play(url);
  }, [url, play]);

  useImperativeHandle(ref, () => ({
    play,
    pause,
    toggle,
    updateVolume,
  }));

  return (
    <Box className={styles.audioWrapper} sx={{ gap: 0.5 }}>
      <div className={styles.pic}>
        <img alt={title} src={pic} />
      </div>
      <Typography
        title={title}
        noWrap
        variant="caption"
        sx={{ color: 'text.secondary', fontWeight: 500, maxWidth: 100 }}
      >
        {title}
      </Typography>
      <div className={styles.time}>
        <Typography sx={{ color: 'text.secondary' }} className={styles.tinyText}>
          {formatDuration(info.currentTime)}
        </Typography>
        <Typography sx={{ color: 'text.secondary', pl: 0.5 }} className={styles.tinyText}>
          {formatDuration(info.duration)}
        </Typography>
      </div>
      <div className={styles.actions}>
        <IconButton onClick={handleOnPrev} size="small" aria-label="previous song">
          <FastRewindRounded />
        </IconButton>
        <IconButton onClick={toggle} size="small" aria-label={!info.playing ? 'play' : 'pause'}>
          {!info.playing ? <PlayArrowRounded /> : <PauseRounded />}
        </IconButton>
        <IconButton onClick={handleOnNext} size="small" aria-label="next song">
          <FastForwardRounded />
        </IconButton>
        <Slider
          size="small"
          aria-label="Volume"
          value={info.volume}
          min={0}
          max={1}
          step={0.1}
          onChange={handleOnVolumeChange}
          sx={(t) => ({
            width: 100,
            color: 'rgba(0,0,0,0.87)',
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
              backgroundColor: '#fff',
              '&::before': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
              },
            },
            ...t.applyStyles('dark', {
              color: '#fff',
            }),
          })}
        />
      </div>
    </Box>
  );
});

export default AudioPlayer;
