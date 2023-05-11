import { Box, Stack, Text, View, Heading } from "native-base";
import { StyleSheet } from "react-native";
const Container = ({ header, children }) => {
  return (
    <View style={styles.container}>
      <Stack space={4}>
        {header && (
          <Box>
            <Heading
              color="white"
              variant="h5"
              fontWeight="700"
              textTransform="uppercase"
            >
              {header}
            </Heading>
            <View style={styles.underline} />
          </Box>
        )}
        {children}
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
  },
  containerHeading: {
    position: "relative",
    paddingHorizontal: 10,
  },
  underline: {
    position: "absolute",
    width: 100,
    height: 5,
    backgroundColor: "#ff0000",
    left: 8,
    bottom: -5,
  },
});

export default Container;
