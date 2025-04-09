import { View, FlatList, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CocktailCard from "@/components/CocktailCard";

type Cocktail = {
  id: string;
  name: string;
  image_url: string;
};

export default function AlcoholCocktailsScreen() {
  const { id, name } = useLocalSearchParams();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktails = async () => {
      // Fetch alcohol name
      const { data: alcoholData } = await supabase
        .from("alcohols")
        .select("name")
        .eq("id", id)
        .single();

      // Fetch cocktails made from this alcohol
      const { data: cocktailData, error } = await supabase
        .from("cocktails")
        .select("id, name, image_url")
        .contains("alcohol_ids", [id]); // assuming alcohol_ids is an array column

      if (error) console.error("Supabase error:", error);
      else setCocktails(cocktailData || []);
      setLoading(false);
    };

    if (id) fetchCocktails();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginHorizontal: 16,
          marginVertical: 12,
        }}
      >
        Cocktails with {name}
      </Text>
      {loading ? (
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      ) : cocktails.length === 0 ? (
        <Text style={{ textAlign: "center" }}>No cocktails found 😔</Text>
      ) : (
        <FlatList
          data={cocktails}
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
