import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFavorites } from "@/store/useFavorites";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";

const CocktailDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [cocktail, setCocktail] = useState<any>(null);
  const [ingredients, setIngredients] = useState<
    { name: string; measure: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const isSaved = favorites.some((item) => item.id === cocktail.id);

  const handleToggleFavorite = () => {
    if (isSaved) {
      removeFavorite(cocktail.id);
    } else {
      addFavorite({
        id: cocktail.id,
        name: cocktail.name,
        image_url: cocktail.image_url,
      });
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const { data: cocktailData } = await supabase
        .from("cocktails")
        .select("id, name, image_url, instructions, glass_type")
        .eq("id", id)
        .single();

      const { data: ingredientsData } = await supabase
        .from("cocktail_ingredients")
        .select("measure, ingredients(name)")
        .eq("cocktail_id", id);

      setCocktail(cocktailData);
      setIngredients(
        ingredientsData?.map((item: any) => ({
          //TODO::: added any type for item will be replaced with the correct type
          name: item.ingredients.name,
          measure: item.measure,
        })) || []
      );
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading || !cocktail) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={"#709255"} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={"#000"} />
      </TouchableOpacity>

      <Image source={{ uri: cocktail.image_url }} style={styles.image} />

      <Text style={styles.title}>{cocktail.name}</Text>
      <Text style={styles.glass}>Served in: {cocktail.glass_type}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.paragraph}>{cocktail.instructions}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>
              {ingredient.measure} - {ingredient.name}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={styles.favoriteButton}
      >
        <MaterialCommunityIcons
          name={isSaved ? "heart" : "heart-outline"}
          size={28}
          color={isSaved ? "red" : "white"}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CocktailDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 24,
    padding: 8,
    zIndex: 20,
  },
  backButton: {
    position: "absolute",
    zIndex: 1,
    top: 50,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 999,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  glass: {
    fontSize: 14,
    color: "#888",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  ingredientItem: {
    paddingVertical: 4,
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
