import { View, Text, Button } from "react-native";

export default function Search({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
      <Text onPress={() => navigation.navigate("Home")}>Back to home</Text>

      {/* <Link href="/movie/123">Go to Details</Link> */}
    </View>
  );
}
