import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useSearch } from "@/stores/useSearch";
import { supabase } from "@/lib/supabase";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  const { query, setQuery, setResults } = useSearch();

  const onSearch = async (text: string) => {
    setQuery(text);

    if (text.trim() === "") {
      setResults([]);
      return;
    }

    const [cocktails, alcohols] = await Promise.all([
      supabase
        .from("cocktails")
        .select("id, name, image_url")
        .ilike("name", `%${text}%`),
      supabase
        .from("alcohols")
        .select("id, name, image_url")
        .ilike("name", `%${text}%`),
    ]);

    const cocktailResults =
      cocktails.data?.map((c) => ({ ...c, type: "cocktail" })) ?? [];
    const alcoholResults =
      alcohols.data?.map((a) => ({ ...a, type: "alcohol" })) ?? [];

    setResults([...cocktailResults, ...alcoholResults]);
  };

  return (
    <BlurView intensity={80} tint="light" style={{ paddingTop: top }}>
      <View
        style={[
          styles.container,
          {
            height: 60,
            gap: 10,
            paddingHorizontal: 16,
            backgroundColor: "transparent",
          },
        ]}
      >
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={"#000"}
          />
          <TextInput
            value={query}
            onChangeText={onSearch}
            style={styles.input}
            placeholder="Search cocktails or alcohols"
            placeholderTextColor={"#000"}
          />
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000",
  },
});

export default CustomHeader;
