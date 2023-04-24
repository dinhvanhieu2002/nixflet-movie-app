import { useState, useEffect } from "react";
import {
  Box,
  Text,
  View,
  Button,
  Heading,
  Stack,
  Divider,
  Badge,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { ImageBackground, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

import { StyleSheet } from "react-native";

import uiConfigs from "../../configs/ui.configs";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";
import CircularRate from "./CircularRate";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const { height } = Dimensions.get("window");
  const navigation = useNavigation();

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response.results);
      if (error) console.log(error.message);
    };

    const getGenres = async () => {
      const { response, error } = await genreApi.getList({ mediaType });
      if (response) {
        setGenres(response.genres);
        getMedias();
      }

      if (error) console.log(error.message);
    };

    getGenres();
  }, [mediaType, mediaCategory]);

  return (
    <View>
      <Swiper
        loop
        style={styles.wrapper}
        showsPagination={false}
        showsButtons={false}
        height={height * 0.6}
      >
        {movies.map((movie) => (
          <View key={movie.id} style={styles.slide}>
            <ImageBackground
              resizeMode="cover"
              style={styles.backgroundImage}
              source={{
                uri: `${tmdbConfigs.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )}`,
              }}
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
                    alignItems: "center",
                    paddingHorizontal: 30,
                    width: "100%",
                  }}
                >
                  <Stack space={9} direction="column">
                    <Heading fontSize="3xl" fontWeight="bold" color="white">
                      {movie.title || movie.name}
                    </Heading>
                    <Stack
                      style={{
                        justifyContent: "flex-start",
                      }}
                      direction="row"
                      space={3}
                    >
                      <CircularRate progress={movie.vote_average} />

                      <Divider orientation="vertical" />

                      {[...movie.genre_ids]
                        .splice(0, 2)
                        .map((genreId, index) => (
                          <Badge
                            alignSelf="center"
                            variant="solid"
                            color="#ff0000"
                            colorScheme="red"
                            key={index}
                            rounded="md"
                          >
                            {genres.find((e) => e.id === genreId) &&
                              genres.find((e) => e.id === genreId).name}
                          </Badge>
                        ))}
                    </Stack>

                    <Text color="white" numberOfLines={3}>
                      {movie.overview}
                    </Text>

                    <Button
                      style={{
                        width: 150,
                        backgroundColor: "#db0000",
                      }}
                      color="white"
                      onPress={() =>
                        navigation.push("MediaDetail", {
                          mediaType,
                          mediaId: movie.id,
                        })
                      }
                      variant="solid"
                      size="lg"
                      startIcon={
                        <FontAwesome name="play" size={20} color="white" />
                      }
                    >
                      Watch Now
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </ImageBackground>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    width: "100%",
    height: "60%",
  },
  slide: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "black",
  },
  content: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 3,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rating: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#e50914",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HeroSlide;
