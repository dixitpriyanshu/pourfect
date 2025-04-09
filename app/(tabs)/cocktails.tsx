import { View, FlatList, Text } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CocktailCard from "@/components/CocktailCard";
import { useSearch } from "@/stores/useSearch";
import { useFocusEffect } from "expo-router";

type Cocktail = {
  id: string;
  name: string;
  image_url: string;
};

export default function CocktailsScreen() {
  const { query, setQuery } = useSearch();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);
  const filteredCocktails = cocktails.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      setQuery(""); // Reset search when screen is focused
      return () => {};
    }, [])
  );

  useEffect(() => {
    const fetchCocktails = async () => {
      const { data, error } = await supabase
        .from("cocktails")
        .select("id, name, image_url")
        .order("name");

      if (error) console.error("Supabase error:", error);
      else setCocktails(data || []);
      setLoading(false);
    };

    fetchCocktails();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Text style={{ textAlign: "center" }}>Loading cocktails...</Text>
      ) : (
        <FlatList
          data={filteredCocktails}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CocktailCard {...item} />}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 16,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
