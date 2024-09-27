import { createApi } from '@reduxjs/toolkit/query/react';
import baseHttpClientQuery from './base-http-client-query';
import { BilibiliViewResponse, BilibiliPlayUrlResponse } from '../../model';
import { BILIBILI_API } from '../../constants';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

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
    }),
  }),
});

export default httpGateway;
