import { MMKV } from "react-native-mmkv";
const storage = new MMKV();

export enum CacheStorageKeys {
  COCKTAILS_KEY = "cocktails",
  ALCOHOLS_KEY = "alcohols",
}

export const saveCache = ({
  key,
  data,
}: {
  key: CacheStorageKeys;
  data: any;
}) => {
  storage.set(key, JSON.stringify(data));
};

export const getDataFromCache = ({ key }: { key: CacheStorageKeys }) => {
  const cached = storage.getString(key);
  if (!cached) {
    return null;
  }
  return JSON.parse(cached);
};
