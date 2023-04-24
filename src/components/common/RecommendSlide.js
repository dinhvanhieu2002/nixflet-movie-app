import Swiper from "react-native-swiper";
import { Dimensions, StyleSheet } from "react-native";
import MediaItem from "./MediaItem";
import { View } from "native-base";

const RecommendSlide = ({ mediaType, medias }) => {
  const { height, width } = Dimensions.get("window");

  const slides = [];
  for (let i = 0; i < medias.length; i += 2) {
    slides.push(
      <View style={styles.slide} key={i}>
        <MediaItem mediaType={mediaType} media={medias[i]} />
        <MediaItem mediaType={mediaType} media={medias[i + 1]} />
      </View>
    );
  }

  return (
    <Swiper
      width={width}
      height={height * 0.3}
      style={styles.wrapper}
      showsPagination={false}
      showsButtons={false}
      loop={false}
    >
      {slides}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default RecommendSlide;
