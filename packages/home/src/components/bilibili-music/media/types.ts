export interface AudioPlayerProps {
  url: string;
  title?: string;
  pic?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export interface AudioPlayerRef {
  play: (url?: string) => void;
  pause: () => void;
  updateVolume: (target: number) => void;
  toggle: () => void;
}

export interface UseAudioOptions {
  onEvent?: (name: string, event?: unknown) => void;
}
