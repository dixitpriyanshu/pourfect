import { View, FlatList, Text } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useFocusEffect } from "expo-router";
import AlcoholCard from "@/components/AlcoholCard";
import { useSearch } from "@/stores/useSearch";

type Alcohol = {
  id: string;
  name: string;
  image_url: string;
};

export default function AlcoholsScreen() {
  const [alcohols, setAlcohols] = useState<Alcohol[]>([]);
  const [loading, setLoading] = useState(true);
  const { setQuery } = useSearch();

  useFocusEffect(
    useCallback(() => {
      setQuery(""); // Reset search when screen is focused
      return () => {};
    }, [])
  );

  useEffect(() => {
    const fetchAlcohols = async () => {
      const { data, error } = await supabase
        .from("alcohols")
        .select("id, name, image_url")
        .order("name");

      if (error) console.error("Supabase error:", error);
      else setAlcohols(data || []);
      setLoading(false);
    };

    fetchAlcohols();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Text style={{ textAlign: "center" }}>Loading alcohols...</Text>
      ) : (
        <FlatList
          data={alcohols}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AlcoholCard {...item} />}
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
