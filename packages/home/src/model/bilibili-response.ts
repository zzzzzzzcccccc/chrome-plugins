export interface BilibiliViewResponse {
  code: number;
  data: {
    bvid: string;
    aid: string;
    tid: string;
    cid: string;
    title: string;
    desc: string;
    pic: string;
    owner: {
      mid: string;
      name: string;
      face: string;
    };
    stat: {
      aid: string;
      view: number;
      favorite: number;
      share: number;
      like: number;
    };
    pages: Array<{
      cid: string;
      part: string;
      first_frame: string;
    }>;
  };
}

export interface BilibiliPlayUrlResponse {
  code: number;
  data: {
    format: string;
    quality: number;
    dash: {
      audio: Array<{ id: number; base_url: string; mime_type: string; codecs: string }>;
      video: Array<{ id: number; height: number; base_url: string; mime_type: string; codecs: string }>;
    };
  };
}
