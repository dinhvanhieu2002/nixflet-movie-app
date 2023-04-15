import { View, Text, Button, ScrollView, SafeAreaView } from "react-native";

export default function FavofiteList({ navigation, route }) {
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "red" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Favorite List</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
