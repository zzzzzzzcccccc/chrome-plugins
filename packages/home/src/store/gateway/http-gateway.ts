import { createApi } from '@reduxjs/toolkit/query/react';
import baseHttpClientQuery from './base-http-client-query';
import { BilibiliViewResponse, BilibiliPlayUrlResponse } from '../../model';
import { BILIBILI_API } from '../../constants';
import { downloadByUrl } from '../../utils/download';

const httpGateway = createApi({
  reducerPath: 'httpGateway',
  baseQuery: baseHttpClientQuery(),
  tagTypes: [],
  endpoints: (build) => ({
    getBilibiliView: build.mutation<BilibiliViewResponse, string>({
      query: (bvid) => ({
        url: BILIBILI_API.view,
        method: 'GET',
        params: { bvid },
      }),
    }),
    getBilibiliPlayUrl: build.query<
      BilibiliPlayUrlResponse,
      { bvid: string; cid: string; qn?: number; fnval?: number }
    >({
      query: (payload) => ({
        url: BILIBILI_API.playUrl,
        method: 'GET',
        params: {
          bvid: payload.bvid,
          cid: payload.cid,
          qn: payload?.qn || 64,
          fnval: payload?.fnval || 16,
        },
      }),
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    bilibiliPlayUrlDownload: build.mutation<
      BilibiliPlayUrlResponse,
      { fileName: string; bvid: string; cid: string; qn?: number; fnval?: number }
    >({
      query: (payload) => ({
        url: BILIBILI_API.playUrl,
        method: 'GET',
        params: {
          bvid: payload.bvid,
          cid: payload.cid,
          qn: payload?.qn || 64,
          fnval: payload?.fnval || 16,
        },
      }),
      onQueryStarted: async (payload, { queryFulfilled }) => {
        const { fileName } = payload;
        const result = (await queryFulfilled)?.data;
        const urls = (result?.data?.dash?.audio || []).map((i) => i.base_url).filter(Boolean);
        if (urls?.length) {
          await downloadByUrl(urls[0], `${fileName}.mp3`);
        }
      },
    }),
  }),
});

export default httpGateway;
