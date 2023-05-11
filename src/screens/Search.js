import { SafeAreaView, ScrollView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { View, Text, Stack, Button, Input } from "native-base";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";

const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

export default function Search({ navigation, route }) {
  const { handleScroll } = route.params;

  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, error } = await mediaApi.search({
      mediaType,
      query,
      page,
    });

    setOnSearch(false);

    if (error) console.log(error.message);

    if (response) {
      if (page > 1) setMedias((m) => [...m, ...response.results]);
      else setMedias([...response.results]);
    }
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else {
      search();
    }
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  const onQueryChange = (text) => {
    const newQuery = text;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ backgroundColor: "black" }}
      >
        <View style={{ padding: 2, marginTop: 100 }}>
          <Stack
            space={2}
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            style={{ marginVertical: 4 }}
          >
            <Stack direction="row" space={2}>
              {mediaTypes.map((item, index) => (
                <Button
                  key={index}
                  onPress={() => onCategoryChange(item)}
                  bgColor={mediaType === item ? "#ff0000" : "#000"}
                  color="white"
                  size="lg"
                  variant={mediaType === item ? "solid" : "unstyled"}
                  textTransform="uppercase"
                >
                  <Text style={{ textTransform: "uppercase", color: "white" }}>
                    {item}
                  </Text>
                </Button>
              ))}
            </Stack>
          </Stack>

          <View style={{ marginVertical: 20 }}>
            <Input
              width="100%"
              color="white"
              onChangeText={onQueryChange}
              autoFocus
              placeholder="Search"
              style={{ marginVertical: 10 }}
            />
          </View>

          {medias.length > 0 && (
            <MediaGrid medias={medias} mediaType={mediaType} />
          )}

          <Button
            isLoading={onSearch}
            size="lg"
            textTransform="uppercase"
            style={{ marginTop: 8 }}
            variant="unstyled"
            color="#ff0000"
            onPress={() => setPage(page + 1)}
          >
            <Text style={{ textTransform: "uppercase", color: "white" }}>
              load more
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
