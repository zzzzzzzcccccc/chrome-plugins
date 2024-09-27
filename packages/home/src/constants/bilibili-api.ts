const gateway = 'https://api.bilibili.com';

const BILIBILI_API = {
  /**
   * Method GET
   * bvid string
   * {
   *   "code": 0,
   *   "message": "0",
   *   "ttl": 1,
   *   "data": {
   *     "bvid": "BV1Uw411i7yQ",
   *     "aid": 321083135,
   *     "videos": 1,
   *     "tid": 31,
   *     "tname": "翻唱",
   *     "copyright": 1,
   *     "pic": "http://i1.hdslb.com/bfs/archive/f96213abd64f37bc06fb3e93a8a31737d6f72d27.jpg",
   *     "title": "时间抹去永远 让《爱在西元前》",
   *     "pubdate": 1695031875,
   *     "ctime": 1695031875,
   *     "desc": "我感到很疲倦离家乡还是很远 害怕再也不能回到你身边",
   *     "desc_v2": [
   *       {
   *         "raw_text": "我感到很疲倦离家乡还是很远 害怕再也不能回到你身边",
   *         "type": 1,
   *         "biz_id": 0
   *       }
   *     ],
   *     "state": 0,
   *     "duration": 214,
   *     "mission_id": 1521552,
   *     "rights": {
   *       "bp": 0,
   *       "elec": 0,
   *       "download": 1,
   *       "movie": 0,
   *       "pay": 0,
   *       "hd5": 1,
   *       "no_reprint": 1,
   *       "autoplay": 1,
   *       "ugc_pay": 0,
   *       "is_cooperation": 0,
   *       "ugc_pay_preview": 0,
   *       "no_background": 0,
   *       "clean_mode": 0,
   *       "is_stein_gate": 0,
   *       "is_360": 0,
   *       "no_share": 0,
   *       "arc_pay": 0,
   *       "free_watch": 0
   *     },
   *     "owner": {
   *       "mid": 1975503183,
   *       "name": "船长阿福Phoozie",
   *       "face": "https://i0.hdslb.com/bfs/face/8a4aae1108a5799d0e92e31d29085877260a91ef.jpg"
   *     },
   *     "stat": {
   *       "aid": 321083135,
   *       "view": 119585,
   *       "danmaku": 58,
   *       "reply": 278,
   *       "favorite": 1555,
   *       "coin": 3029,
   *       "share": 507,
   *       "now_rank": 0,
   *       "his_rank": 0,
   *       "like": 4924,
   *       "dislike": 0,
   *       "evaluation": "",
   *       "vt": 0
   *     },
   *     "argue_info": {
   *       "argue_msg": "",
   *       "argue_type": 0,
   *       "argue_link": ""
   *     },
   *     "dynamic": "",
   *     "cid": 1271281812,
   *     "dimension": {
   *       "width": 1920,
   *       "height": 1080,
   *       "rotate": 0
   *     },
   *     "premiere": null,
   *     "teenage_mode": 0,
   *     "is_chargeable_season": false,
   *     "is_story": false,
   *     "is_upower_exclusive": false,
   *     "is_upower_play": false,
   *     "is_upower_preview": false,
   *     "enable_vt": 0,
   *     "vt_display": "",
   *     "no_cache": false,
   *     "pages": [
   *       {
   *         "cid": 1271281812,
   *         "page": 1,
   *         "from": "vupload",
   *         "part": "时间抹去永远 让《爱在西元前》",
   *         "duration": 214,
   *         "vid": "",
   *         "weblink": "",
   *         "dimension": {
   *           "width": 1920,
   *           "height": 1080,
   *           "rotate": 0
   *         },
   *         "first_frame": "http://i2.hdslb.com/bfs/storyff/n230918sa3gb4rxieg1z1iqqrmyotdrn_firsti.jpg"
   *       }
   *     ],
   *     "subtitle": {
   *       "allow_submit": false,
   *       "list": [
   *         {
   *           "id": 1316017235965457700,
   *           "lan": "ai-zh",
   *           "lan_doc": "中文（自动生成）",
   *           "is_lock": false,
   *           "subtitle_url": "",
   *           "type": 1,
   *           "id_str": "1316017235965457664",
   *           "ai_type": 0,
   *           "ai_status": 2,
   *           "author": {
   *             "mid": 0,
   *             "name": "",
   *             "sex": "",
   *             "face": "",
   *             "sign": "",
   *             "rank": 0,
   *             "birthday": 0,
   *             "is_fake_account": 0,
   *             "is_deleted": 0,
   *             "in_reg_audit": 0,
   *             "is_senior_member": 0,
   *             "name_render": null
   *           }
   *         }
   *       ]
   *     },
   *     "is_season_display": false,
   *     "user_garb": {
   *       "url_image_ani_cut": ""
   *     },
   *     "honor_reply": {},
   *     "like_icon": "",
   *     "need_jump_bv": false,
   *     "disable_show_up_info": false,
   *     "is_story_play": 1,
   *     "is_view_self": false
   *   }
   * }
   */
  view: `${gateway}/x/web-interface/view`,
  /**
   * Method GET
   * cid string
   * bvid string
   * qn number
   * fnval number
   * {
   *   "code": 0,
   *   "message": "0",
   *   "ttl": 1,
   *   "data": {
   *     "from": "local",
   *     "result": "suee",
   *     "message": "",
   *     "quality": 64,
   *     "format": "flv720",
   *     "timelength": 213674,
   *     "accept_format": "hdflv2,flv,flv720,flv480,mp4",
   *     "accept_description": [
   *       "高清 1080P+",
   *       "高清 1080P",
   *       "高清 720P",
   *       "清晰 480P",
   *       "流畅 360P"
   *     ],
   *     "accept_quality": [
   *       112,
   *       80,
   *       64,
   *       32,
   *       16
   *     ],
   *     "video_codecid": 7,
   *     "seek_param": "start",
   *     "seek_type": "offset",
   *     "dash": {
   *       "duration": 214,
   *       "minBufferTime": 1.5,
   *       "min_buffer_time": 1.5,
   *       "video": [
   *         {
   *           "id": 80,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-100113.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=7d3a200702f022664484038f9c40359b&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=162702&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-100113.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=7d3a200702f022664484038f9c40359b&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=162702&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100113.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=e0dd7e4ece31d4c6fb49ef2f247a77db&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=162702&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100113.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=e0dd7e4ece31d4c6fb49ef2f247a77db&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=162702&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100113.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=e0dd7e4ece31d4c6fb49ef2f247a77db&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=162702&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100113.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=e0dd7e4ece31d4c6fb49ef2f247a77db&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=162702&logo=40000000"
   *           ],
   *           "bandwidth": 1298371,
   *           "mimeType": "video/mp4",
   *           "mime_type": "video/mp4",
   *           "codecs": "hev1.1.6.L150.90",
   *           "width": 1920,
   *           "height": 1080,
   *           "frameRate": "30.303",
   *           "frame_rate": "30.303",
   *           "sar": "1:1",
   *           "startWithSap": 1,
   *           "start_with_sap": 1,
   *           "SegmentBase": {
   *             "Initialization": "0-1154",
   *             "indexRange": "1155-1702"
   *           },
   *           "segment_base": {
   *             "initialization": "0-1154",
   *             "index_range": "1155-1702"
   *           },
   *           "codecid": 12
   *         },
   *         {
   *           "id": 80,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30080.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=046ce2b6d55334c56607d00500a5db1e&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=337978&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30080.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=046ce2b6d55334c56607d00500a5db1e&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=337978&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-mirror08c.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30080.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=08cbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=3f2bfe35b76d7a94b833289eee12dbc9&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=337978&logo=40000000",
   *             "https://upos-sz-mirror08c.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30080.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=08cbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=3f2bfe35b76d7a94b833289eee12dbc9&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=337978&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-mirror08c.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30080.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=08cbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=3f2bfe35b76d7a94b833289eee12dbc9&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=337978&logo=40000000",
   *             "https://upos-sz-mirror08c.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30080.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=08cbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=3f2bfe35b76d7a94b833289eee12dbc9&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=337978&logo=40000000"
   *           ],
   *           "bandwidth": 2697077,
   *           "mimeType": "video/mp4",
   *           "mime_type": "video/mp4",
   *           "codecs": "avc1.640033",
   *           "width": 1920,
   *           "height": 1080,
   *           "frameRate": "29.412",
   *           "frame_rate": "29.412",
   *           "sar": "1:1",
   *           "startWithSap": 1,
   *           "start_with_sap": 1,
   *           "SegmentBase": {
   *             "Initialization": "0-979",
   *             "indexRange": "980-1527"
   *           },
   *           "segment_base": {
   *             "initialization": "0-979",
   *             "index_range": "980-1527"
   *           },
   *           "codecid": 7
   *         },
   *         {
   *           "id": 64,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-100111.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f248a2d19663a476276bc68e50a1de4e&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=65253&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-100111.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f248a2d19663a476276bc68e50a1de4e&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=65253&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100111.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=42eb2f39a00d9a2662181dd3eeba7141&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=65253&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100111.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=42eb2f39a00d9a2662181dd3eeba7141&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=65253&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100111.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=42eb2f39a00d9a2662181dd3eeba7141&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=65253&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100111.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=42eb2f39a00d9a2662181dd3eeba7141&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=65253&logo=40000000"
   *           ],
   *           "bandwidth": 520727,
   *           "mimeType": "video/mp4",
   *           "mime_type": "video/mp4",
   *           "codecs": "hev1.1.6.L120.90",
   *           "width": 1280,
   *           "height": 720,
   *           "frameRate": "30.303",
   *           "frame_rate": "30.303",
   *           "sar": "1:1",
   *           "startWithSap": 1,
   *           "start_with_sap": 1,
   *           "SegmentBase": {
   *             "Initialization": "0-1154",
   *             "indexRange": "1155-1702"
   *           },
   *           "segment_base": {
   *             "initialization": "0-1154",
   *             "index_range": "1155-1702"
   *           },
   *           "codecid": 12
   *         },
   *         {
   *           "id": 64,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30064.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=587729f7007fac5f40b0ff92c3290f4f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=200037&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30064.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=587729f7007fac5f40b0ff92c3290f4f&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=200037&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30064.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=001faa8d96d2bd55c2ed20c84e8466e1&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=200037&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30064.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=001faa8d96d2bd55c2ed20c84e8466e1&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=200037&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30064.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=001faa8d96d2bd55c2ed20c84e8466e1&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=200037&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30064.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=001faa8d96d2bd55c2ed20c84e8466e1&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=200037&logo=40000000"
   *           ],
   *           "bandwidth": 1596301,
   *           "mimeType": "video/mp4",
   *           "mime_type": "video/mp4",
   *           "codecs": "avc1.640033",
   *           "width": 1280,
   *           "height": 720,
   *           "frameRate": "29.412",
   *           "frame_rate": "29.412",
   *           "sar": "1:1",
   *           "startWithSap": 1,
   *           "start_with_sap": 1,
   *           "SegmentBase": {
   *             "Initialization": "0-979",
   *             "indexRange": "980-1527"
   *           },
   *           "segment_base": {
   *             "initialization": "0-979",
   *             "index_range": "980-1527"
   *           },
   *           "codecid": 7
   *         },
   *         {
   *           "id": 32,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-100110.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=dd48eaa458b45ee8ab545a98dac28608&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=34498&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-100110.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=dd48eaa458b45ee8ab545a98dac28608&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=34498&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100110.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=90eff1b576db6bfe4294799dc5a36b85&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=34498&logo=40000000",
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100110.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=90eff1b576db6bfe4294799dc5a36b85&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=34498&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100110.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=90eff1b576db6bfe4294799dc5a36b85&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=34498&logo=40000000",
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100110.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=90eff1b576db6bfe4294799dc5a36b85&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=34498&logo=40000000"
   *           ],
   *           "bandwidth": 275301,
   *           "mimeType": "video/mp4",
   *           "mime_type": "video/mp4",
   *           "codecs": "hev1.1.6.L120.90",
   *           "width": 852,
   *           "height": 480,
   *           "frameRate": "30.303",
   *           "frame_rate": "30.303",
   *           "sar": "1:1",
   *           "startWithSap": 1,
   *           "start_with_sap": 1,
   *           "SegmentBase": {
   *             "Initialization": "0-1154",
   *             "indexRange": "1155-1702"
   *           },
   *           "segment_base": {
   *             "initialization": "0-1154",
   *             "index_range": "1155-1702"
   *           },
   *           "codecid": 12
   *         },
   *         {
   *           "id": 32,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30032.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=483a3a279cc46c694ec6573995b2ab98&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=83845&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30032.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=483a3a279cc46c694ec6573995b2ab98&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=83845&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-estgcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30032.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=e262521b44eb5b8ffd09d3953d0e9d8b&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=83845&logo=40000000",
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30032.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f9386025677b60182d2558269c248e97&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=83845&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-estgcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30032.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=e262521b44eb5b8ffd09d3953d0e9d8b&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=83845&logo=40000000",
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30032.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f9386025677b60182d2558269c248e97&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=83845&logo=40000000"
   *           ],
   *           "bandwidth": 669087,
   *           "mimeType": "video/mp4",
   *           "mime_type": "video/mp4",
   *           "codecs": "avc1.640033",
   *           "width": 852,
   *           "height": 480,
   *           "frameRate": "29.412",
   *           "frame_rate": "29.412",
   *           "sar": "1:1",
   *           "startWithSap": 1,
   *           "start_with_sap": 1,
   *           "SegmentBase": {
   *             "Initialization": "0-979",
   *             "indexRange": "980-1527"
   *           },
   *           "segment_base": {
   *             "initialization": "0-979",
   *             "index_range": "980-1527"
   *           },
   *           "codecid": 7
   *         },
   *         {
   *           "id": 16,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-100109.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=0c444bd62abc3e7bd6132bc20c0f776e&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22464&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-100109.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=0c444bd62abc3e7bd6132bc20c0f776e&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22464&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-estgcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100109.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=96ce3f8b967382c4502df59c31013b79&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22464&logo=40000000",
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100109.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f3f3e4d7d53482d97a1a69edf0d6208a&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22464&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-estgcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100109.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=96ce3f8b967382c4502df59c31013b79&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22464&logo=40000000",
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-100109.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f3f3e4d7d53482d97a1a69edf0d6208a&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22464&logo=40000000"
   *           ],
   *           "bandwidth": 179269,
   *           "mimeType": "video/mp4",
   *           "mime_type": "video/mp4",
   *           "codecs": "hev1.1.6.L120.90",
   *           "width": 640,
   *           "height": 360,
   *           "frameRate": "30.303",
   *           "frame_rate": "30.303",
   *           "sar": "1:1",
   *           "startWithSap": 1,
   *           "start_with_sap": 1,
   *           "SegmentBase": {
   *             "Initialization": "0-1152",
   *             "indexRange": "1153-1700"
   *           },
   *           "segment_base": {
   *             "initialization": "0-1152",
   *             "index_range": "1153-1700"
   *           },
   *           "codecid": 12
   *         },
   *         {
   *           "id": 16,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30016.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=2cfc2d3e0318d68afcd906fdf8091103&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=45795&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30016.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=2cfc2d3e0318d68afcd906fdf8091103&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=45795&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30016.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f0a510036b4d171236e404cce2cf3e53&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=45795&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30016.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f0a510036b4d171236e404cce2cf3e53&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=45795&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30016.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f0a510036b4d171236e404cce2cf3e53&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=45795&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30016.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=f0a510036b4d171236e404cce2cf3e53&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=45795&logo=40000000"
   *           ],
   *           "bandwidth": 365447,
   *           "mimeType": "video/mp4",
   *           "mime_type": "video/mp4",
   *           "codecs": "avc1.640033",
   *           "width": 640,
   *           "height": 360,
   *           "frameRate": "29.412",
   *           "frame_rate": "29.412",
   *           "sar": "1:1",
   *           "startWithSap": 1,
   *           "start_with_sap": 1,
   *           "SegmentBase": {
   *             "Initialization": "0-985",
   *             "indexRange": "986-1533"
   *           },
   *           "segment_base": {
   *             "initialization": "0-985",
   *             "index_range": "986-1533"
   *           },
   *           "codecid": 7
   *         }
   *       ],
   *       "audio": [
   *         {
   *           "id": 30280,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=81d7a8790c4dacc6e8dc3b16a60abfe0&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22024&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=81d7a8790c4dacc6e8dc3b16a60abfe0&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22024&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=a69f19bf4b9c78e2c85fa3b10dbcb2f9&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22024&logo=40000000",
   *             "https://upos-sz-estgcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=8eb448fa91f37e34d326c6edfea37f4c&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22024&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=cosbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=a69f19bf4b9c78e2c85fa3b10dbcb2f9&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22024&logo=40000000",
   *             "https://upos-sz-estgcos.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=cos&upsig=8eb448fa91f37e34d326c6edfea37f4c&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=22024&logo=40000000"
   *           ],
   *           "bandwidth": 175694,
   *           "mimeType": "audio/mp4",
   *           "mime_type": "audio/mp4",
   *           "codecs": "mp4a.40.2",
   *           "width": 0,
   *           "height": 0,
   *           "frameRate": "",
   *           "frame_rate": "",
   *           "sar": "",
   *           "startWithSap": 0,
   *           "start_with_sap": 0,
   *           "SegmentBase": {
   *             "Initialization": "0-933",
   *             "indexRange": "934-1481"
   *           },
   *           "segment_base": {
   *             "initialization": "0-933",
   *             "index_range": "934-1481"
   *           },
   *           "codecid": 0
   *         },
   *         {
   *           "id": 30216,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=2f9d465b67d4a20ef610d9abb59cc174&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=5669&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=2f9d465b67d4a20ef610d9abb59cc174&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=5669&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-mirrorbd.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=bdbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=896c671e6e7504f27425b56040cf3fe6&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=5669&logo=40000000",
   *             "https://upos-sz-mirrorbd.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=bdbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=896c671e6e7504f27425b56040cf3fe6&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=5669&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-mirrorbd.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=bdbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=896c671e6e7504f27425b56040cf3fe6&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=5669&logo=40000000",
   *             "https://upos-sz-mirrorbd.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30216.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=bdbv&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=896c671e6e7504f27425b56040cf3fe6&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=5669&logo=40000000"
   *           ],
   *           "bandwidth": 45209,
   *           "mimeType": "audio/mp4",
   *           "mime_type": "audio/mp4",
   *           "codecs": "mp4a.40.5",
   *           "width": 0,
   *           "height": 0,
   *           "frameRate": "",
   *           "frame_rate": "",
   *           "sar": "",
   *           "startWithSap": 0,
   *           "start_with_sap": 0,
   *           "SegmentBase": {
   *             "Initialization": "0-943",
   *             "indexRange": "944-1491"
   *           },
   *           "segment_base": {
   *             "initialization": "0-943",
   *             "index_range": "944-1491"
   *           },
   *           "codecid": 0
   *         },
   *         {
   *           "id": 30232,
   *           "baseUrl": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30232.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=a35137a11942a69603cd3c42c7c6ae52&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=11857&logo=A0020000",
   *           "base_url": "https://xy111x173x76x14xy.mcdn.bilivideo.cn:4483/upgcxcode/12/18/1271281812/1271281812-1-30232.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=mcdn&oi=3723001834&trid=0000bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=a35137a11942a69603cd3c42c7c6ae52&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&mcdnid=50008212&bvc=vod&nettype=0&orderid=0,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=11857&logo=A0020000",
   *           "backupUrl": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30232.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=8d334457aa112eb2bee9718f2a64e0f0&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=11857&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30232.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=8d334457aa112eb2bee9718f2a64e0f0&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=11857&logo=40000000"
   *           ],
   *           "backup_url": [
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30232.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=8d334457aa112eb2bee9718f2a64e0f0&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=1,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=11857&logo=40000000",
   *             "https://upos-sz-estgoss.bilivideo.com/upgcxcode/12/18/1271281812/1271281812-1-30232.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1727148246&gen=playurlv2&os=upos&oi=3723001834&trid=bc709159bb534be18d29cb04b36899aeu&mid=262436795&platform=pc&og=hw&upsig=8d334457aa112eb2bee9718f2a64e0f0&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&bvc=vod&nettype=0&orderid=2,3&buvid=5B144AA7-079C-188B-E61B-6F3B2E05FC9D33029infoc&build=0&f=u_0_0&agrr=1&bw=11857&logo=40000000"
   *           ],
   *           "bandwidth": 94591,
   *           "mimeType": "audio/mp4",
   *           "mime_type": "audio/mp4",
   *           "codecs": "mp4a.40.2",
   *           "width": 0,
   *           "height": 0,
   *           "frameRate": "",
   *           "frame_rate": "",
   *           "sar": "",
   *           "startWithSap": 0,
   *           "start_with_sap": 0,
   *           "SegmentBase": {
   *             "Initialization": "0-933",
   *             "indexRange": "934-1481"
   *           },
   *           "segment_base": {
   *             "initialization": "0-933",
   *             "index_range": "934-1481"
   *           },
   *           "codecid": 0
   *         }
   *       ],
   *       "dolby": {
   *         "type": 0,
   *         "audio": null
   *       },
   *       "flac": null
   *     },
   *     "support_formats": [
   *       {
   *         "quality": 112,
   *         "format": "hdflv2",
   *         "new_description": "1080P 高码率",
   *         "display_desc": "1080P",
   *         "superscript": "高码率",
   *         "codecs": [
   *           "avc1.640033",
   *           "hev1.1.6.L150.90"
   *         ]
   *       },
   *       {
   *         "quality": 80,
   *         "format": "flv",
   *         "new_description": "1080P 高清",
   *         "display_desc": "1080P",
   *         "superscript": "",
   *         "codecs": [
   *           "avc1.640033",
   *           "hev1.1.6.L150.90"
   *         ]
   *       },
   *       {
   *         "quality": 64,
   *         "format": "flv720",
   *         "new_description": "720P 高清",
   *         "display_desc": "720P",
   *         "superscript": "",
   *         "codecs": [
   *           "avc1.640033",
   *           "hev1.1.6.L120.90"
   *         ]
   *       },
   *       {
   *         "quality": 32,
   *         "format": "flv480",
   *         "new_description": "480P 清晰",
   *         "display_desc": "480P",
   *         "superscript": "",
   *         "codecs": [
   *           "avc1.640033",
   *           "hev1.1.6.L120.90"
   *         ]
   *       },
   *       {
   *         "quality": 16,
   *         "format": "mp4",
   *         "new_description": "360P 流畅",
   *         "display_desc": "360P",
   *         "superscript": "",
   *         "codecs": [
   *           "avc1.640033",
   *           "hev1.1.6.L120.90"
   *         ]
   *       }
   *     ],
   *     "high_format": null,
   *     "last_play_time": 13000,
   *     "last_play_cid": 1271281812,
   *     "view_info": null
   *   }
   * }
   */
  playUrl: `${gateway}/x/player/wbi/playurl`,
};

export default BILIBILI_API;
