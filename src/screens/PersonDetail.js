import { ScrollView, SafeAreaView } from "react-native";
import { View, Text, Heading, VStack, Image } from "native-base";
import { useEffect, useState } from "react";
import personApi from "../api/modules/person.api";
import Container from "../components/common/Container";
import MediaGrid from "../components/common/MediaGrid";
import tmdbConfigs from "../api/configs/tmdb.configs";
import PersonMediaGrid from "../components/common/PersonMediaGrid";

export default function PersonDetail({ route }) {
  const { personId } = route.params;

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
      <ScrollView style={{ backgroundColor: "red" }}>
        {person && (
          <View style={{ padding: 10 }}>
            <VStack space={10}>
              <Image
                alt=""
                width="50%"
                height="70%"
                resizeMode="cover"
                source={{ uri: tmdbConfigs.posterPath(person.profile_path) }}
              />
              <Heading variant="h5" fontWeight="700">
                {`${person.name} (${person.birthday.split("-")[0]}`}
                {person.deathday && ` -${person.deathday.split("-")[0]}`}
                {")"}
              </Heading>
              <Text numberOfLines={10}>{person.biography}</Text>
            </VStack>

            <Container header="Medias">
              <PersonMediaGrid personId={personId} />
            </Container>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
