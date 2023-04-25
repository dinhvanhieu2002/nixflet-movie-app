import { useEffect, useRef, useState, useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import ImageHeader from "../components/common/ImageHeader";
import tmdbConfigs from "../api/configs/tmdb.configs";
import {
  Badge,
  Button,
  Divider,
  IconButton,
  Heading,
  Stack,
  Text,
  View,
  Icon,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import CastSlide from "../components/common/CastSlide";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import MediaReview from "../components/common/MediaReview";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaSlide from "../components/common/MediaSlide";
import { AuthContext } from "../context/AuthContext";

export default function MediaDetail({ route }) {
  const { mediaType, mediaId } = route.params;
  const { height, width } = Dimensions.get("window");
  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);
  const { addFavorite, removeFavorite, listFavorites } =
    useContext(AuthContext);

  const videoRef = useRef(null);
  useEffect(() => {
    const getMedia = async () => {
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (error) console.log(error.message);
    };

    getMedia();
  }, [mediaType, mediaId]);

  const onFavoritePress = async () => {
    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaType: mediaType,
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, error } = await favoriteApi.add(body);

    setOnRequest(false);

    if (error) console.log(error.message);
    if (response) {
      //add favorite
      await addFavorite(response);
      console.log("add favorite success");
      setIsFavorite(true);
    }
  };
  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const favorites = await listFavorites();

    const favorite = favorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );

    const { response, error } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });

    setOnRequest(false);

    if (error) console.log(error.message);

    if (response) {
      await removeFavorite(favorite);
      setIsFavorite(false);
      console.log("remove favorite success");
    }
  };

  return media ? (
    <SafeAreaView>
      <ScrollView style={{ height: 1000, backgroundColor: "black" }}>
        <View height={height * 0.56} width={width}>
          <ImageHeader
            bgPath={tmdbConfigs.backdropPath(
              media.backdrop_path || media.poster_path
            )}
            posterPath={tmdbConfigs.posterPath(
              media.poster_path || media.backdrop_path
            )}
          />
        </View>
        <View style={{ padding: 16, display: "flex" }}>
          <Stack space={9} direction="column">
            <Heading fontSize="3xl" fontWeight="bold" color="white">
              {`${media?.title || media.name} ${
                mediaType === tmdbConfigs.mediaType.movie
                  ? media.release_date.split("-")[0]
                  : media.first_air_date.split("-")[0]
              }`}
            </Heading>
            <Stack
              style={{
                justifyContent: "flex-start",
              }}
              direction="row"
              space={3}
            >
              <CircularRate progress={media.vote_average} />

              <Divider orientation="vertical" />

              {genres.map((genre, index) => (
                <Badge
                  alignSelf="center"
                  variant="solid"
                  color="#ff0000"
                  colorScheme="red"
                  key={index}
                  rounded="md"
                >
                  {genre.name}
                </Badge>
              ))}
            </Stack>

            <Text color="white">{media.overview}</Text>
            <Stack direction="row" space={1}>
              <IconButton
                onPress={onFavoritePress}
                icon={
                  <Icon
                    as={Entypo}
                    name={isFavorite ? "heart" : "heart-outlined"}
                    size={8}
                    color="red.700"
                  />
                }
              />
              <Button
                style={{
                  width: 150,
                  backgroundColor: "#db0000",
                }}
                color="white"
                variant="solid"
                startIcon={<FontAwesome name="play" size={20} color="white" />}
              >
                Watch Now
              </Button>
            </Stack>

            {/* cast slide */}
            <Container header="Cast">
              <CastSlide casts={media.credits.cast} />
            </Container>
          </Stack>
        </View>

        {/* video youtube */}

        <Container header="Videos">
          <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
        </Container>

        {/* media backdrop */}
        {media.images.backdrops.length > 0 && (
          <Container header="Backdrops">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}

        {/* media poster */}
        {media.images.posters.length > 0 && (
          <Container header="Posters">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}

        {/* media review */}
        <MediaReview
          reviews={media.reviews}
          media={media}
          mediaType={mediaType}
        />

        {/* media recommend */}
        <Container header="You may also like">
          {media.recommend.length > 0 && (
            <RecommendSlide medias={media.recommend} mediaType={mediaType} />
          )}

          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container>
      </ScrollView>
    </SafeAreaView>
  ) : null;
}
