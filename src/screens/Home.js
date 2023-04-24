import {
  View,
  Text,
  Button,
  LogBox,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function Home({ route }) {
  const { handleScroll } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <HeroSlide
          mediaType={tmdbConfigs.mediaType.movie}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />
        <View style={{ padding: 2 }}>
          <Container header="popular movies">
            <MediaSlide
              mediaType={tmdbConfigs.mediaType.movie}
              mediaCategory={tmdbConfigs.mediaCategory.popular}
            />
          </Container>

          <Container header="popular series">
            <MediaSlide
              mediaType={tmdbConfigs.mediaType.tv}
              mediaCategory={tmdbConfigs.mediaCategory.popular}
            />
          </Container>

          <Container header="top rated movies">
            <MediaSlide
              mediaType={tmdbConfigs.mediaType.movie}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          </Container>

          <Container header="top rated series">
            <MediaSlide
              mediaType={tmdbConfigs.mediaType.tv}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          </Container>
        </View>
        {/* footer */}
      </ScrollView>
    </SafeAreaView>
  );
}
