// components/SearchResultsOverlay.tsx
import { useSearch } from "@/stores/useSearch";
import { View, Text, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export default function SearchResultsOverlay() {
  const { results, clear } = useSearch();
  const router = useRouter();

  if (results.length === 0) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 100,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        zIndex: 99,
        maxHeight: 400,
        borderRadius: 12,
        margin: 12,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              clear();
              router.push(
                item.type === "cocktail"
                  ? `/recipe/${item.id}`
                  : `/alcohol-cocktails/${item.id}`
              );
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              gap: 10,
            }}
          >
            <Image
              source={item.image_url}
              style={{ width: 50, height: 50, borderRadius: 8 }}
            />
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: "#888", marginLeft: "auto" }}>
              {item.type.toLocaleUpperCase()}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
