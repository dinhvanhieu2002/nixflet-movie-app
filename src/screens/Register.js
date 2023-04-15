import { Ionicons } from "@expo/vector-icons";

import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  FormControl,
  Input,
  StatusBar,
  Link,
  Button,
  HStack,
  Icon,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
export default function Register({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading, errorMessage } = useContext(AuthContext);

  const registerValidationSchema = Yup.object().shape({
    username: Yup.string()
      .min(8, ({ min }) => `Username must be at least ${min} characters`)
      .required("Username is required"),
    displayName: Yup.string()
      .min(8, ({ min }) => `displayName must be at least ${min} characters`)
      .required("displayName is required"),
    password: Yup.string()
      .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        "Password must have a special character"
      )
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  return (
    <>
      <Center w="100%" height="100%" backgroundColor="#181a20">
        <Box safeArea p="2" py="8" w="90%" maxW="310">
          <Center>
            <Heading size="lg" fontWeight="600" color="white">
              Create a new account
            </Heading>
            <Heading mt="1" color="gray.700" fontWeight="medium" size="xs">
              Please fill in the form to continue
            </Heading>
          </Center>

          <VStack space={4} mt="10">
            <Formik
              initialValues={{
                username: "",
                displayName: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={async (values) => {
                const response = await signup(values);
                if (response) {
                  navigation.navigate("Login");
                }
              }}
              validationSchema={registerValidationSchema}
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
                <VStack space="1">
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
                    placeholder="Display name"
                    padding="5"
                    backgroundColor="#262a34"
                    borderColor="#262a34"
                    color="white"
                    focusOutlineColor="#262a34"
                    cursorColor="white"
                    onChangeText={handleChange("displayName")}
                    onBlur={handleBlur("displayName")}
                    value={values.displayName}
                  />
                  {errors.displayName && touched.displayName && (
                    <Text style={{ fontSize: 10, color: "red", marginTop: 0 }}>
                      {errors.displayName}
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
                  <Input
                    borderRadius="2xl"
                    placeholder="Confirm password"
                    type={showPassword ? "text" : "password"}
                    padding="5"
                    backgroundColor="#262a34"
                    borderColor="#262a34"
                    color="white"
                    focusOutlineColor="#262a34"
                    cursorColor="#fff"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
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
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={{ fontSize: 10, color: "red", marginTop: 1 }}>
                      {errors.confirmPassword}
                    </Text>
                  )}

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
                    Sign up
                  </Button>
                </VStack>
              )}
            </Formik>

            <HStack alignSelf="center" mt="3">
              <Text fontSize="sm" color="white">
                Have an Account?{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                  textDecoration: "none",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                Sign in
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
