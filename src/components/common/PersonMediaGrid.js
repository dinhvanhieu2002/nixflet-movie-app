import { View, SimpleGrid, Button, Text, Center } from "native-base";
import { useState, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MediaItem from "./MediaItem";
import personApi from "../../api/modules/person.api";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;
  console.log(medias.length);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await personApi.medias({ personId });

      if (error) console.log(error.message);
      if (response) {
        const mediasSorted = response.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        );
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].splice(0, skip));
      }
    };
    getMedias();
  }, [personId]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);

    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const { height, width } = Dimensions.get("window");
  return (
    <>
      <SimpleGrid columns={2} space={1} minChildWidth="50%">
        {filteredMedias.map((media, index) => (
          <View style={{ height: height * 0.3, width: width / 2 }} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </View>
        ))}
      </SimpleGrid>
      {filteredMedias.length < medias.length && (
        <Center>
          <Button bgColor="#ff0000" w={150} onPress={() => onLoadMore()}>
            <Text style={{ textTransform: "uppercase", color: "white" }}>
              load more
            </Text>
          </Button>
        </Center>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default PersonMediaGrid;
