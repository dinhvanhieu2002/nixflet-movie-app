import { Box, Text, View } from "native-base";
import { useState, useEffect, useRef, useCallback } from "react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import Swiper from "react-native-swiper";
import YoutubePlayer from "react-native-youtube-iframe";
// import YouTube from "react-native-youtube";
import { Dimensions, StyleSheet } from "react-native";
const MediaVideo = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  const ytbRef = useRef();
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <YoutubePlayer
        videoId={video.key}
        width="100%"
        height={200}
        play={playing}
        onStateChange={onStateChange}
      />
    </View>
  );
};

const MediaVideosSlide = ({ videos }) => {
  const { height, width } = Dimensions.get("window");
  console.log(videos);
  return (
    <Swiper
      index={0}
      width={width}
      height={height * 0.3}
      style={styles.wrapper}
      showsPagination={false}
      showsButtons={false}
    >
      {videos.map((video, index) => (
        <View key={index}>
          <MediaVideo video={video} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerItem: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default MediaVideosSlide;
