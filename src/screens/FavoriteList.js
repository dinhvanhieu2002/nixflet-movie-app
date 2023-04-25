import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from "native-base";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { useContext, useEffect, useState } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Container from "../components/common/Container";
import favoriteApi from "../api/modules/favorite.api";
import tmdbConfigs from "../api/configs/tmdb.configs";
import CircularRate from "../components/common/CircularRate";
import { AuthContext } from "../context/AuthContext";

export default function FavofiteList({ navigation, route }) {
  // const { handleScroll } = route.params;
  const { removeFavorite } = useContext(AuthContext);
  const [medias, setMedias] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, error } = await favoriteApi.getList();

      if (error) console.log(error.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);
      }
    };

    getFavorites();
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    onRemoveFavorite(rowKey);
    closeRow(rowMap, rowKey);
    const newData = [...medias];
    const prevIndex = newData.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setMedias(newData);
  };

  const onRemoveFavorite = async (rowKey) => {
    const { response, error } = await favoriteApi.remove({
      favoriteId: rowKey,
    });

    if (error) console.log(error.message);
    if (response) {
      removeFavorite({ mediaId: rowKey });
      setCount(count - 1);
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Box key={item.id} w="100%" backgroundColor="black">
        <Pressable onPress={() => console.log("you touched me")}>
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <Image
                alt=""
                size="100px"
                source={{
                  uri: tmdbConfigs.posterPath(item.mediaPoster),
                }}
              />
              <VStack space={5}>
                <Heading
                  numberOfLines={2}
                  colorScheme="white"
                  fontSize="sm"
                  fontWeight="bold"
                  color="white"
                  overflow="hidden"
                  width="100%"
                >
                  {item.mediaTitle}
                </Heading>
                <View style={{ alignSelf: "flex-start" }}>
                  <CircularRate progress={item.mediaRate} />
                </View>
              </VStack>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };

  const renderHideItem = (data, rowMap) => {
    return (
      <HStack flex={1} pl={2}>
        <Pressable
          w="70"
          ml="auto"
          cursor="pointer"
          bg="coolGray.200"
          justifyContent="center"
          onPress={() => closeRow(rowMap, data.item.id)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <VStack alignItems="center" space={2}>
            <Icon
              as={<Entypo name="dots-three-horizontal" />}
              size="xs"
              color="coolGray.800"
            />
            <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
              More
            </Text>
          </VStack>
        </Pressable>
        <Pressable
          w="70"
          cursor="pointer"
          bg="red.500"
          justifyContent="center"
          onPress={() => deleteRow(rowMap, data.item.id)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <VStack alignItems="center" space={2}>
            <Icon
              as={<MaterialIcons name="delete" />}
              color="white"
              size="xs"
            />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <ScrollView
        // onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View p={5}>
          <Container header={`Your favorite (${count})`}>
            <Box safeArea flex={1}>
              <SwipeListView
                scrollEnabled={false}
                data={medias}
                renderItem={renderItem}
                renderHiddenItem={renderHideItem}
                rightOpenValue={-130}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
              />
            </Box>
          </Container>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
