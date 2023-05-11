import Swiper from "react-native-swiper";
import { StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Image, Text, View } from "native-base";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const BackdropItem = ({ backdrop }) => {
  return (
    <Image
      source={{ uri: tmdbConfigs.backdropPath(backdrop.file_path) }}
      resizeMode="cover"
      style={styles.backgroundImage}
      alt=""
    />
  );
};

const BackdropSlide = ({ backdrops }) => {
  const { height, width } = Dimensions.get("window");
  return (
    <Swiper
      index={0}
      width={width}
      height={height * 0.25}
      style={styles.wrapper}
      showsPagination={true}
      showsButtons={true}
    >
      {[...backdrops].splice(0, 10).map((backdrop, index) => (
        <View style={styles.slide} key={index}>
          <BackdropItem backdrop={backdrop} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});

export default BackdropSlide;
