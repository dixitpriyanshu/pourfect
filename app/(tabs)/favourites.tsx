import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "@/stores/useFavorites";
import CocktailCard from "@/components/CocktailCard";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-gray-500">No favorites yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
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
  );
}
