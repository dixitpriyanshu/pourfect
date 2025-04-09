import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNetworkStatus } from "@/hooks/useNetwork";
import { CacheStorageKeys, getDataFromCache, saveCache } from "@/lib/cache";

type Cocktail = {
  id: string;
  name: string;
  image_url: string;
};

export const useCocktails = () => {
  const isConnected = useNetworkStatus();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCocktails = async () => {
    setLoading(true);

    if (isConnected) {
      const { data, error } = await supabase
        .from("cocktails")
        .select("id, name, image_url")
        .order("name");

      if (data) {
        setCocktails(data);
        saveCache({ key: CacheStorageKeys.COCKTAILS_KEY, data });
      } else {
        // fallback to cache if supabase fails
        const cached = getDataFromCache({
          key: CacheStorageKeys.COCKTAILS_KEY,
        });
        if (cached) setCocktails(cached);
      }
    } else {
      // Offline fallback
      const cached = getDataFromCache({ key: CacheStorageKeys.COCKTAILS_KEY });
      if (cached) setCocktails(cached);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCocktails();
  }, [isConnected]);

  return { cocktails, loading };
};
