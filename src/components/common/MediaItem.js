import { useEffect, useState } from "react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { Heading, Text, View, Link, Box, Stack } from "native-base";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CircularRate from "./CircularRate";
const MediaItem = ({ media, mediaType }) => {
  //list favorite
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState();
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setTitle(media?.title || media?.name || media?.mediaTitle);

    setPosterPath(
      tmdbConfigs.posterPath(
        media?.poster_path ||
          media?.backdrop_path ||
          media?.mediaPoster ||
          media?.profile_path
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media?.release_date && media?.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media?.first_air_date && media?.first_air_date.split("-")[0]
      );
    }
    setRate(media?.vote_average || media?.mediaRate);
  }, [media, mediaType]);

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        mediaType !== "people"
          ? navigation.push("MediaDetail", {
              mediaType,
              mediaId: media.id,
            })
          : navigation.push("PersonDetail", {
              personId: media.id,
            })
      }
    >
      <ImageBackground
        source={{ uri: posterPath }}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
          w="100%"
          height="100%"
          bg={{
            linearGradient: {
              colors: uiConfigs.style.gradientBgImage.colors,
              start: uiConfigs.style.gradientBgImage.start,
              end: uiConfigs.style.gradientBgImage.end,
            },
          }}
          zIndex={2}
        />
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
          w="100%"
          height="30%"
          bg={{
            linearGradient: {
              colors: uiConfigs.style.horizontalGradientBgImage.colors,
              start: uiConfigs.style.horizontalGradientBgImage.start,
              end: uiConfigs.style.horizontalGradientBgImage.end,
            },
          }}
          zIndex={2}
        />
        <Box
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 3,
          }}
        >
          <Box
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingHorizontal: 30,
              width: "100%",
            }}
          >
            <Stack width="100%" space={5} direction="column">
              <View style={{ alignItems: "flex-start" }}>
                <CircularRate progress={rate} />
              </View>
              <Text style={{ color: "white" }}>{releaseDate}</Text>
              <Heading
                w="100%"
                numberOfLines={1}
                fontSize="xl"
                fontWeight="bold"
                color="white"
              >
                {title}
              </Heading>
            </Stack>
          </Box>
        </Box>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "black",
    overflow: "hidden",
  },
});

export default MediaItem;
