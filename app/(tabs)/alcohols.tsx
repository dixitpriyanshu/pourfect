import { View, FlatList, Text } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
import AlcoholCard from "@/components/AlcoholCard";
import { useSearch } from "@/stores/useSearch";
import { useAlcohols } from "@/stores/useAlcohols";

export default function AlcoholsScreen() {
  const { alcohols, loading } = useAlcohols();
  const { setQuery } = useSearch();

  useFocusEffect(
    useCallback(() => {
      setQuery(""); // Reset search when screen is focused
      return () => {};
    }, [])
  );

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
