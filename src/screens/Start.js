import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";

export default function Start({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#eee",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          style={{
            flex: 1,
            resizeMode: "center",
          }}
          source={require("../../assets/img/unsplash.jpg")}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
          }}
        >
          Hello World!
        </Text>
      </View>
    </View>
    // <View style={styles.container}>
    //   <ImageBackground
    //     source={require("../../assets/img/unsplash.jpg")}
    //     style={styles.background}
    //   ></ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // position: "relative",
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    height: "80%",
    width: "100%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});
