import { View, SimpleGrid } from "native-base";

import { Dimensions, StyleSheet } from "react-native";
import MediaItem from "./MediaItem";

const MediaGrid = ({ medias, mediaType }) => {
  const { height, width } = Dimensions.get("window");
  return (
    <SimpleGrid columns={2} space={1} minChildWidth="50%">
      {medias.map((media, index) => (
        <View style={{ height: height * 0.3, width: width / 2 }} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </View>
      ))}
    </SimpleGrid>
    // <View style={styles.container}>
    //   {medias.map((media, index) => (
    //     <View style={styles.item} key={index}>
    //       <MediaItem media={media} mediaType={mediaType} />
    //     </View>
    //   ))}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  item: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default MediaGrid;
