import Swiper from "react-native-swiper";
import { StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Image, Text, View } from "native-base";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const PosterItem = ({ poster }) => {
  return (
    <Image
      source={{ uri: tmdbConfigs.posterPath(poster.file_path) }}
      resizeMode="cover"
      style={styles.backgroundImage}
      alt=""
    />
  );
};

const PosterSlide = ({ posters }) => {
  const { height, width } = Dimensions.get("window");
  return (
    <Swiper
      width={width}
      height={height * 0.25}
      style={styles.wrapper}
      showsPagination={true}
      showsButtons={true}
      index={0}
    >
      {[...posters].splice(0, 10).map((poster, index) => (
        <View style={styles.slide} key={index}>
          <PosterItem poster={poster} />
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

export default PosterSlide;
