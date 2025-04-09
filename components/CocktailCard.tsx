import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Image, useImage } from "expo-image";

type Props = {
  id: string;
  name: string;
  image_url: string;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function CocktailCard({ id, name, image_url }: Props) {
  const router = useRouter();
  const image = useImage(image_url, {
    maxWidth: 800,
    onError(error, retry) {
      console.error("Loading failed:", error.message);
    },
  });
  if (!image) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Pressable
      onPress={() => router.push(`/recipe/${id}`)}
      style={{
        margin: 8,
        borderRadius: 12,
        overflow: "hidden",
        width: "45%",
      }}
    >
      <Image
        style={{
          width: "auto",
          height: 200,
          overflow: "hidden",
        }}
        source={image}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <View style={{ padding: 12, backgroundColor: "#D9D9D9" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
}
