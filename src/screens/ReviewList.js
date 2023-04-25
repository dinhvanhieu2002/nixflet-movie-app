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
import reviewApi from "../api/modules/review.api";
import tmdbConfigs from "../api/configs/tmdb.configs";
import CircularRate from "../components/common/CircularRate";
import { AuthContext } from "../context/AuthContext";
import dayjs from "dayjs";

export default function ReviewList({ navigation, route }) {
  // const { handleScroll } = route.params;
  const [reviews, setReviews] = useState([]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const getReviews = async () => {
      const { response, error } = await reviewApi.getList();

      if (error) console.log(error.message);
      if (response) {
        setCount(response.length);
        setReviews([...response]);
      }
    };

    getReviews();
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    onRemoveReview(rowKey);
    closeRow(rowMap, rowKey);
    const newData = [...reviews];
    const prevIndex = newData.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setReviews(newData);
  };

  const onRemoveReview = async (rowKey) => {
    const { response, error } = await reviewApi.remove({
      reviewId: rowKey,
    });

    if (error) console.log(error.message);
    if (response) {
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
              <View style={{ alignSelf: "flex-start" }}>
                <VStack space={3}>
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
                  <Text color="white">
                    {dayjs(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                  </Text>
                  <Text color="white">{item.content}</Text>
                </VStack>
              </View>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };

  const renderHideItem = (data, rowMap) => {
    console.log(data);
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
                data={reviews}
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
