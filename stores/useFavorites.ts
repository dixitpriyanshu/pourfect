import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/lib/storage";

type Favorite = {
  id: string;
  name: string;
  image_url: string;
};

type Store = {
  favorites: Favorite[];
  addFavorite: (item: Favorite) => void;
  removeFavorite: (id: string) => void;
};

export const useFavorites = create<Store>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (item) => {
        const exists = get().favorites.some((fav) => fav.id === item.id);
        if (!exists) {
          set({ favorites: [...get().favorites, item] });
        }
      },
      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter((fav) => fav.id !== id) });
      },
    }),
    {
      name: "favorites",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
