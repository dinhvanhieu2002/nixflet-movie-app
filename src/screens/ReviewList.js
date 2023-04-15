import { View, Text, Button, ScrollView, SafeAreaView } from "react-native";

export default function ReviewList({ navigation, route }) {
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "red" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Review List</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
