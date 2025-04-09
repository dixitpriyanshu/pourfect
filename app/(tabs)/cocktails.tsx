import { View, FlatList, Text } from "react-native";
import { useCallback } from "react";
import CocktailCard from "@/components/CocktailCard";
import { useSearch } from "@/stores/useSearch";
import { useFocusEffect } from "expo-router";
import { useCocktails } from "@/stores/useCocktails";

export default function CocktailsScreen() {
  const { setQuery } = useSearch();
  const { cocktails, loading } = useCocktails();

  useFocusEffect(
    useCallback(() => {
      setQuery(""); // Reset search when screen is focused
      return () => {};
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Text style={{ textAlign: "center" }}>Loading cocktails...</Text>
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
