import { useState, useRef, useMemo } from 'react';
import { useDevelopApps, AppItem } from './use-apps';
import { LRUCache, formatString, storage } from '../utils';
import { APP_SEARCH_LRU_CAPACITY, SESSION_KEYS } from '../constants';

export type RecentKeywordItem = { source: string; date: string };

export default function useAppSearch() {
  const developApps = useDevelopApps();

  const [keyword, setKeyword] = useState('');
  const [apps, setApps] = useState<AppItem[]>([]);
  const [recentKeywordMap, setRecentKeywordMap] = useState(
    storage.get<Record<string, RecentKeywordItem>>(SESSION_KEYS.recentKeyword) || {},
  );
  const [filterRecentKeywordMap, setFilterRecentKeywordMap] = useState<Record<string, RecentKeywordItem>>({});

  const lruCacheRef = useRef(
    new LRUCache<string, RecentKeywordItem>(APP_SEARCH_LRU_CAPACITY, new Map(Object.entries(recentKeywordMap))),
  );

  const allApps = useMemo(() => developApps, [developApps]);

  const handlerSearchApps = (target: string) => {
    const value = target.trim();
    setApps(
      !value
        ? []
        : allApps.filter(
            (app) => formatString.toLocaleLowerCase(app.title).indexOf(formatString.toLocaleLowerCase(value)) > -1,
          ),
    );
  };

  const handleSearchRecentKeyword = (target: string) => {
    const value = target.trim();
    setFilterRecentKeywordMap(
      !value
        ? {}
        : Object.keys(recentKeywordMap)
            .filter(
              (keyword) => formatString.toLocaleLowerCase(keyword).indexOf(formatString.toLocaleLowerCase(value)) > -1,
            )
            .reduce((current: Record<string, RecentKeywordItem>, pre) => {
              current[pre] = recentKeywordMap[pre];
              return current;
            }, {}),
    );
  };

  const addRecentKeyword = (target: string, source: string) => {
    const item = { date: new Date().toISOString(), source };
    lruCacheRef.current.set(target, item);
    const current = lruCacheRef.current.toJson();
    setRecentKeywordMap(current);
    storage.set(SESSION_KEYS.recentKeyword, current);
    setFilterRecentKeywordMap((prev) => ({
      ...prev,
      [target]: item,
    }));
  };

  const removeRecentKeyword = (target: string) => {
    lruCacheRef.current.remove(target);
    const current = lruCacheRef.current.toJson();
    setRecentKeywordMap(current);
    storage.set(SESSION_KEYS.recentKeyword, current);
    setFilterRecentKeywordMap((prev) => {
      return Object.keys(prev)
        .filter((str) => str !== target)
        .reduce((cur: Record<string, RecentKeywordItem>, next) => {
          cur[next] = current[next];
          return cur;
        }, {});
    });
  };

  return {
    keyword,
    setKeyword,
    apps,
    filterRecentKeywordMap,
    handlerSearchApps,
    handleSearchRecentKeyword,
    addRecentKeyword,
    removeRecentKeyword,
  };
}
