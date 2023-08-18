import { useState } from 'react';
import { StorageAndSession, storage, session } from '../utils';

export function useStorage<T>(key: string, initialValue: T) {
  return useStorageAndSession(key, initialValue, storage);
}

export function useSession<T>(key: string, initialValue: T) {
  return useStorageAndSession(key, initialValue, session);
}

function useStorageAndSession<T>(
  key: string,
  initialValue: T,
  storageAndSession: StorageAndSession,
): [T, typeof setState] {
  const [state, setState] = useState(storageAndSession.get<T>(key) ?? initialValue);

  const handleState: typeof setState = (payload) => {
    setState((prev) => {
      const newState = payload instanceof Function ? payload(prev) : payload;
      storageAndSession.set(key, newState);
      return newState;
    });
  };

  return [state, handleState];
}
