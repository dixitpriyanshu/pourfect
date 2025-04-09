import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNetworkStatus } from "@/hooks/useNetwork";
import { CacheStorageKeys, getDataFromCache, saveCache } from "@/lib/cache";
type Alcohol = {
  id: string;
  name: string;
  image_url: string;
};

export const useAlcohols = () => {
  const isConnected = useNetworkStatus();
  const [alcohols, setAlcohols] = useState<Alcohol[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlcohols = async () => {
    setLoading(true);

    if (isConnected) {
      const { data, error } = await supabase
        .from("alcohols")
        .select("id, name, image_url")
        .order("name");

      if (data) {
        setAlcohols(data);
        saveCache({ key: CacheStorageKeys.ALCOHOLS_KEY, data });
      } else {
        const cached = getDataFromCache({ key: CacheStorageKeys.ALCOHOLS_KEY });
        if (cached) setAlcohols(cached);
      }
    } else {
      const cached = getDataFromCache({ key: CacheStorageKeys.ALCOHOLS_KEY });
      if (cached) setAlcohols(cached);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAlcohols();
  }, [isConnected]);

  return { alcohols, loading };
};
