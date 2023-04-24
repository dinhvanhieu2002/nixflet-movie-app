import { Box, Text, View } from "native-base";
import { useState, useEffect, useRef } from "react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import Swiper from "react-native-swiper";
// import YouTube from "react-native-youtube";
import { Dimensions, StyleSheet } from "react-native";
const MediaVideo = ({ video }) => {
  const ytbRef = useRef();

  return (
    <View>
      {/* <YouTube
        videoId={video.key} // The YouTube video ID
        play // control playback of video with true/false
        fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        onReady={(e) => this.setState({ isReady: true })}
        onChangeState={(e) => this.setState({ status: e.state })}
        onChangeQuality={(e) => this.setState({ quality: e.quality })}
        onError={(e) => this.setState({ error: e.error })}
        style={{ alignSelf: "stretch", height: "100%" }}
      /> */}
    </View>
  );
};

const MediaVideosSlide = ({ videos }) => {
  const { height, width } = Dimensions.get("window");

  return (
    <Swiper
      width={width}
      height={height * 0.3}
      style={styles.wrapper}
      showsPagination={true}
      showsButtons={true}
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
