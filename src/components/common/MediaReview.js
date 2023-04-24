import React, { useContext, useEffect, useState } from "react";
import reviewApi from "../../api/modules/review.api";
import {
  Button,
  Center,
  Divider,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  TextArea,
  VStack,
  View,
} from "native-base";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Container from "./Container";
import { AuthContext } from "../../context/AuthContext";
import TextAvatar from "./TextAvatar";

function ReviewItem({ review, onRemoved }) {
  const [onRequest, setOnRequest] = useState(false);
  const { userInfo } = useContext(AuthContext);

  const onRemove = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const { response, error } = await reviewApi.remove({ reviewId: review.id });

    if (error) console.log(error.message);

    if (response) onRemoved(review.id);
  };
  return (
    <View
      style={{
        padding: 16,
      }}
    >
      <HStack space={4}>
        <TextAvatar text={review.user.displayName} />
        <VStack space={2} flexGrow={1}>
          <Stack space={1}>
            <Heading size="md" style={{ color: "white" }} fontSize={20}>
              {review.user.displayName}
            </Heading>
            <Text style={{ color: "white", fontSize: 18 }}>
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Text>
          </Stack>
          <Text style={{ color: "white", fontSize: 18 }}>{review.content}</Text>
          {userInfo && userInfo.id === review.user.id && (
            <Button
              style={{
                width: 150,
                backgroundColor: "#db0000",
              }}
              variant="solid"
              startIcon={<FontAwesome5 name="trash" size={24} color="white" />}
              onPress={onRemove}
              isLoading={onRequest}
              textTransform="uppercase"
            >
              remove
            </Button>
          )}
        </VStack>
      </HStack>
    </View>
  );
}

const MediaReview = ({ reviews, media, mediaType }) => {
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  const { userInfo } = useContext(AuthContext);
  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };

    const { response, error } = await reviewApi.add(body);
    setOnRequest(false);

    if (error) console.log(error.message);
    if (response) {
      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
      console.log("add comment succes");
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);

      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);
    console.log("remove success");
  };

  return (
    <Container header={`Reviews ${reviewCount}`}>
      <Stack space={4} marginBottom={2}>
        {filteredReviews.map((review) => (
          <View key={review.id}>
            <ReviewItem review={review} onRemoved={onRemoved} />
            <Divider />
          </View>
        ))}

        {filteredReviews.length < listReviews.length && (
          <Center>
            <Button
              variant="solid"
              style={{ width: 150, backgroundColor: "transparent" }}
              onPress={onLoadMore}
              textTransform="uppercase"
            >
              <Text color="#db0000">Load more</Text>
            </Button>
          </Center>
        )}
      </Stack>
      {userInfo && (
        <>
          <Divider />
          <Stack direction="row" space={2}>
            <TextAvatar text={userInfo.displayName} />
            <Stack space={4} flexGrow={1}>
              <Heading size="md" style={{ color: "white" }} fontSize={20}>
                {userInfo.displayName}
              </Heading>
              <TextArea
                value={content}
                onChangeText={(text) => setContent(text)}
                color="white"
                h={20}
                placeholder="Write your review"
                w="100%"
              />

              {/* button add review */}
              <Button
                style={{
                  width: 150,
                  backgroundColor: "#db0000",
                }}
                variant="solid"
                startIcon={<Ionicons name="send" size={24} color="white" />}
                onPress={onAddReview}
                isLoading={onRequest}
                textTransform="uppercase"
              >
                Post
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default MediaReview;
