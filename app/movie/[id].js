import { useSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const MovieDetail = () => {
  const { id } = useSearchParams();

  return (
    <View>
      <Text>Detail media {id}</Text>
    </View>
  );
};

export default MovieDetail;
