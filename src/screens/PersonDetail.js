import { ScrollView, SafeAreaView, Dimensions } from "react-native";
import { View, Text, Heading, VStack, Image } from "native-base";
import { useEffect, useState } from "react";
import personApi from "../api/modules/person.api";
import Container from "../components/common/Container";
import MediaGrid from "../components/common/MediaGrid";
import tmdbConfigs from "../api/configs/tmdb.configs";
import PersonMediaGrid from "../components/common/PersonMediaGrid";

export default function PersonDetail({ route }) {
  const { personId } = route.params;
  const { height, width } = Dimensions.get("window");

  const [person, setPerson] = useState();

  useEffect(() => {
    const getPerson = async () => {
      const { response, error } = await personApi.detail({ personId });

      if (error) console.log(error.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId]);

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "black" }}>
        {person && (
          <View style={{ padding: 10, marginTop: 50 }}>
            <VStack space={10}>
              <Image
                alt=""
                width={width / 2}
                height={height * 0.3}
                resizeMode="cover"
                source={{ uri: tmdbConfigs.posterPath(person.profile_path) }}
              />
              <Heading color="white" variant="h5" fontWeight="700">
                {`${person.name} (${person.birthday?.split("-")[0]}`}
                {person.deathday && ` -${person.deathday?.split("-")[0]}`}
                {")"}
              </Heading>
              <Text color="white" numberOfLines={10}>
                {person.biography}
              </Text>
            </VStack>

            <View style={{ marginTop: 0 }}>
              <Container header="Medias">
                <PersonMediaGrid personId={personId} />
              </Container>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
