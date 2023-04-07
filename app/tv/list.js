import { useSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";

export default function TvList() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tv List</Text>
      <Text onPress={() => router.push("/movie/123")}>Go to details</Text>
      {/* <Link href="/movie/123">Go to Details</Link> */}
    </View>
  );
}
