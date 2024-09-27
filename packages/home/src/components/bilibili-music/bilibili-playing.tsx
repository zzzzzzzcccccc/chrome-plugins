import React, { useMemo, useRef } from 'react';
import { useStoreSelector, useGetBilibiliPlayUrlQuery, useStoreDispatch } from '../../hooks';
import { BilibiliPlayMedia, updateBilibiliPlayingInfo } from '../../store/slices/music-slice';
import { AudioPlayer, AudioPlayerRef } from './media';

function BilibiliPlaying() {
  const { bilibiliPlayingInfo } = useStoreSelector((state) => state.music);
  const info =
    bilibiliPlayingInfo.index < 0 || bilibiliPlayingInfo.list.length <= 0
      ? null
      : bilibiliPlayingInfo.list[bilibiliPlayingInfo.index];

  if (!info) {
    return <></>;
  }

  return <BilibiliMedia list={bilibiliPlayingInfo.list} item={info} index={bilibiliPlayingInfo.index} />;
}

function BilibiliMedia(props: { item: BilibiliPlayMedia; list: BilibiliPlayMedia[]; index: number }) {
  const audioPlayerRef = useRef<AudioPlayerRef | null>(null);
  const dispatch = useStoreDispatch();
  const { item, index, list } = props;
  const { bvid, cid, part, first_frame, owner_name } = item;
  const { data } = useGetBilibiliPlayUrlQuery({ bvid, cid });

  const urls = useMemo(() => {
    const audio = data?.data?.dash?.audio || [];
    if (audio.length) {
      return audio.map((i) => i.base_url);
    }
    return [];
  }, [data]);

  const handleOnPrev = () => {
    if (index <= 0) {
      return;
    }
    dispatch(
      updateBilibiliPlayingInfo({
        index: index - 1,
        list,
      }),
    );
  };

  const handleOnNext = () => {
    if (index >= list.length - 1) {
      return;
    }
    dispatch(
      updateBilibiliPlayingInfo({
        index: index + 1,
        list,
      }),
    );
  };

  if (!urls.length) {
    return <></>;
  }

  return (
    <AudioPlayer
      onNext={handleOnNext}
      onPrev={handleOnPrev}
      ref={audioPlayerRef}
      pic={first_frame}
      url={urls[0]}
      title={[part || '', owner_name || ''].filter(Boolean).join(' - ')}
    />
  );
}

export default BilibiliPlaying;
