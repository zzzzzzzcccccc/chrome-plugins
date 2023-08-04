import { useState, useRef, useMemo, useEffect } from 'react';
import { LRUCache, formatString, storage } from '../utils';
import { APP_SEARCH_LRU_CAPACITY, SESSION_KEYS, DEFAULT_APPS } from '../constants';
import { useStoreSelector } from './use-store';
import { AppItem } from '../store/slices/menu-slice';
import useTranslation from './use-translation';

export type RecentKeywordItem = { source: string; date: string };

export default function useAppSearch() {
  const { openSearch } = useStoreSelector((state) => state.app);
  const { list } = useStoreSelector((state) => state.menu);
  const t = useTranslation();

  const openSearchRef = useRef(openSearch);

  const [keyword, setKeyword] = useState('');
  const [apps, setApps] = useState<AppItem[]>([]);
  const [recentKeywordMap, setRecentKeywordMap] = useState(
    storage.get<Record<string, RecentKeywordItem>>(SESSION_KEYS.recentKeyword) || {},
  );
  const [filterRecentKeywordMap, setFilterRecentKeywordMap] = useState<Record<string, RecentKeywordItem>>({});

  const lruCacheRef = useRef(
    new LRUCache<string, RecentKeywordItem>(APP_SEARCH_LRU_CAPACITY, new Map(Object.entries(recentKeywordMap))),
  );

  const allApps = useMemo(
    () => list.flatMap((record) => [...(DEFAULT_APPS?.[record.id] || []), ...record.apps]),
    [list],
  );

  const handlerSearchApps = (target: string) => {
    const value = target.trim();
    setApps(
      !value
        ? []
        : allApps.filter(
            (app) =>
              formatString.toLocaleLowerCase(t(app.title) as string).indexOf(formatString.toLocaleLowerCase(value)) >
              -1,
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

  useEffect(() => {
    openSearchRef.current = openSearch;
  }, [openSearch]);

  return {
    keyword,
    setKeyword,
    apps,
    filterRecentKeywordMap,
    openSearch,
    handlerSearchApps,
    handleSearchRecentKeyword,
    addRecentKeyword,
    removeRecentKeyword,
  };
}
