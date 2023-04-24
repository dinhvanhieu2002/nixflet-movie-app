import { Box, View, Heading, Stack, Text, Image } from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { Dimensions } from "react-native";

const ImageHeader = ({ bgPath, posterPath }) => {
  return (
    <View width="100%" height="100%" style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={{ uri: bgPath }}
        style={styles.backgroundImage}
      >
        <View
          style={{
            padding: 16,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            height="100%"
            bg={{
              linearGradient: {
                colors: uiConfigs.style.horizontalGradientBgImage.colors,
                start: uiConfigs.style.horizontalGradientBgImage.start,
                end: uiConfigs.style.horizontalGradientBgImage.end,
              },
            }}
            zIndex={2}
          />
          <Image
            source={{ uri: posterPath }}
            style={styles.posterImage}
            alt=""
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  posterImage: {
    width: "70%",
    height: "78%",
    marginHorizontal: "auto",
    marginBottom: 20,
    zIndex: 3,
  },
});

export default ImageHeader;
