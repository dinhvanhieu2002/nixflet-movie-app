import { View, Text, Button, ScrollView, SafeAreaView } from "react-native";

export default function PersonDetail() {
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "red" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Person Detail View</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
