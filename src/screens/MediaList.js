import { View, Text, Button, ScrollView, SafeAreaView } from "react-native";

export default function MediaList({ navigation, route }) {
  const { mediaType } = route.params;
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "red" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Media List Screen</Text>
          <Text>media type: {mediaType}</Text>
          <Text>
            ádasdasdasdasdnlvlkncvlknzxlvkzcv zxlckvnzlvknzxkvnzlckvn
            zxlvcknzxkvnzlxkvnlkxn
          </Text>
          <Text onPress={() => navigation.navigate("MediaDetail")}>
            Go to media Detail
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
