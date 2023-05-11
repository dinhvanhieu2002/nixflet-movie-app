import Swiper from "react-native-swiper";
import { StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Pressable, View, Box, Heading } from "native-base";
import uiConfigs from "../../configs/ui.configs";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import { useNavigation } from "@react-navigation/native";
const CastItem = ({ cast }) => {
  const navigation = useNavigation();
  return cast ? (
    <Pressable
      style={styles.containerItem}
      onPress={() =>
        navigation.push("PersonDetail", {
          personId: cast.id,
        })
      }
    >
      <ImageBackground
        source={{ uri: tmdbConfigs.posterPath(cast.profile_path) }}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Heading
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "#0009",
            color: "#fff",
          }}
          w="100%"
          p={5}
          numberOfLines={1}
          fontSize="md"
          fontWeight="bold"
          color="white"
        >
          {cast.name}
        </Heading>
      </ImageBackground>
    </Pressable>
  ) : null;
};

const CastSlide = ({ casts }) => {
  const { height, width } = Dimensions.get("window");
  const castsSlide = [];
  for (let i = 0; i < casts.length; i += 2) {
    castsSlide.push(
      <View style={styles.slide} key={i}>
        <CastItem cast={casts[i]} />
        <CastItem cast={casts[i + 1]} />
      </View>
    );
  }

  return (
    <Swiper
      index={0}
      width={width}
      height={height * 0.3}
      style={styles.wrapper}
      showsPagination={false}
      showsButtons={false}
      loop={false}
    >
      {castsSlide}
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
  },
  containerItem: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#a9a9a9",
  },
});

export default CastSlide;
