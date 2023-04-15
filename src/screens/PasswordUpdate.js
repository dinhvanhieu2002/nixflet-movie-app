import { View, Text, Button, ScrollView, SafeAreaView } from "react-native";

export default function PaswordUpdate({ navigation, route }) {
  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "red" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Password update</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
