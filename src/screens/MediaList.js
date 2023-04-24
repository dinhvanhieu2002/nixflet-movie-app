import { ScrollView, SafeAreaView } from "react-native";
import HeroSlide from "../components/common/HeroSlide";
import { useEffect, useMemo, useState } from "react";
import mediaApi from "../api/modules/media.api";
import { Heading, Stack, Button, View, Text } from "native-base";
import tmdbConfigs from "../api/configs/tmdb.configs";
import MediaGrid from "../components/common/MediaGrid";

export default function MediaList({ navigation, route }) {
  const { mediaType, handleScroll } = route.params;

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const mediaCategories = useMemo(() => ["popular", "top_rated"]);
  const category = ["popular", "top_rated"];

  useEffect(() => {
    const getMedias = async () => {
      setMediaLoading(true);

      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      });

      setMediaLoading(false);
      if (error) console.log(error.message);

      if (response) {
        if (currPage !== 1) setMedias((m) => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    getMedias();
  }, [mediaType, mediaCategories, currCategory, currPage]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;

    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };
  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <ScrollView
        style={{ backgroundColor: "black" }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <HeroSlide
          mediaType={mediaType}
          mediaCategory={mediaCategories[currCategory]}
        />
        <View style={{ padding: 2 }}>
          <Stack
            space={2}
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            style={{ marginVertical: 4 }}
          >
            <Heading fontWeight="700" variant="h5" color="white">
              {mediaType === tmdbConfigs.mediaType.movie
                ? "Movies"
                : "TV Series"}
            </Heading>
            <Stack direction="row" space={2}>
              {category.map((cate, index) => (
                <Button
                  key={index}
                  onPress={() => onCategoryChange(index)}
                  bgColor={currCategory === index && "#ff0000"}
                  color="white"
                  size="lg"
                  variant={currCategory === index ? "solid" : "unstyled"}
                >
                  {cate}
                </Button>
              ))}
            </Stack>
          </Stack>

          {medias.length > 0 && (
            <MediaGrid medias={medias} mediaType={mediaType} />
          )}

          <Button
            size="lg"
            textTransform="uppercase"
            style={{ marginTop: 8 }}
            variant="unstyled"
            color="#ff0000"
            onPress={() => onLoadMore()}
          >
            load more
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
