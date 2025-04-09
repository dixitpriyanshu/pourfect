// stores/useSearch.ts
import { create } from "zustand";

type SearchResult = {
  id: string;
  name: string;
  image_url: string;
  type: string; // "cocktail" or "alcohol"
};

type Store = {
  query: string;
  results: SearchResult[];
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  clear: () => void;
};

export const useSearch = create<Store>((set) => ({
  query: "",
  results: [],
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  clear: () => set({ query: "", results: [] }),
}));
