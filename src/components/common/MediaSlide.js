import { useEffect, useState } from "react";
import mediaApi from "../../api/modules/media.api";
import Swiper from "react-native-swiper";
import { Dimensions, StyleSheet } from "react-native";
import MediaItem from "./MediaItem";
import { View } from "native-base";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  const { height, width } = Dimensions.get("window");

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMedias(response.results);

      if (error) console.log(error.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

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

export default MediaSlide;
