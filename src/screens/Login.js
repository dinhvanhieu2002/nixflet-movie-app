import { useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  Input,
  StatusBar,
  Link,
  Button,
  HStack,
  Icon,
  Alert,
} from "native-base";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { AuthContext } from "../context/AuthContext";

export default function Login({ navigation }) {
  const { login, isLoading, errorMessage } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(8, ({ min }) => `Username must be at least ${min} characters`)
      .required("Username is required"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  return (
    <>
      <Center w="100%" height="100%" backgroundColor="#181a20">
        <Box safeArea p="2" py="8" w="90%" maxW="310">
          <Center>
            <Heading size="lg" fontWeight="600" color="white">
              Welcome Back!
            </Heading>
            <Heading mt="1" color="gray.700" fontWeight="medium" size="xs">
              Please sign in to your account
            </Heading>
          </Center>

          <VStack space={4} mt="10">
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values) => {
                const response = await login(values);
                if (response) {
                  navigation.navigate("Authenticated");
                }
              }}
              validationSchema={loginValidationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
                isValid,
              }) => (
                <VStack space="3">
                  <Input
                    borderRadius="2xl"
                    placeholder="Username"
                    padding="5"
                    backgroundColor="#262a34"
                    borderColor="#262a34"
                    color="white"
                    focusOutlineColor="#262a34"
                    cursorColor="white"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  {errors.username && touched.username && (
                    <Text style={{ fontSize: 10, color: "red", marginTop: 0 }}>
                      {errors.username}
                    </Text>
                  )}
                  <Input
                    borderRadius="2xl"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    padding="5"
                    backgroundColor="#262a34"
                    borderColor="#262a34"
                    color="white"
                    focusOutlineColor="#262a34"
                    cursorColor="#fff"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    rightElement={
                      <Ionicons
                        onPress={() => setShowPassword(!showPassword)}
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color="#464950"
                        style={{ marginRight: 10 }}
                      />
                    }
                  />
                  {errors.password && touched.password && (
                    <Text style={{ fontSize: 10, color: "red", marginTop: 1 }}>
                      {errors.password}
                    </Text>
                  )}
                  <Link
                    _text={{
                      fontSize: "xs",
                      fontWeight: "500",
                      color: "#262a34",
                      textDecoration: "none",
                    }}
                    alignSelf="flex-end"
                    mt="1"
                  >
                    Forgot Password?
                  </Link>

                  {errorMessage && (
                    <Box>
                      <Alert status="error" w="100%">
                        <Text>{errorMessage}</Text>
                      </Alert>
                    </Box>
                  )}

                  <Button
                    disabled={!isValid}
                    isLoading={isLoading}
                    mt="16"
                    colorScheme="blue"
                    borderRadius="2xl"
                    padding="4"
                    _text={{ fontWeight: "bold" }}
                    onPress={handleSubmit}
                  >
                    Sign in
                  </Button>
                  <Button
                    leftIcon={
                      <Icon
                        as={AntDesign}
                        name="google"
                        size="sm"
                        color="black"
                      />
                    }
                    colorScheme="blue"
                    color="cyan.900"
                    borderRadius="2xl"
                    padding="4"
                    _text={{ color: "black", fontWeight: "bold" }}
                    backgroundColor="white"
                  >
                    Sign in with Google
                  </Button>
                </VStack>
              )}
            </Formik>

            <HStack alignSelf="center" mt="3">
              <Text fontSize="sm" color="white">
                Don't have an Account?{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                  textDecoration: "none",
                }}
                onPress={() => navigation.navigate("Register")}
              >
                Sign up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
      <StatusBar />
    </>
  );
}

const styles = StyleSheet.create({});
