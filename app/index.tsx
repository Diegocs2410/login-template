import { Colors } from "@/constants/Colors";
import { loginSchema } from "@/constants/shemas";
import { RootParamsList } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigationProp } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootParamsList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("signup");
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium">App Title</Text>
      <Text variant="headlineSmall">Sign In</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text>This is required.</Text>}
      <Text variant="headlineSmall">Password</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry={true}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text>This is required.</Text>}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Login
      </Button>
      <Text variant="bodyMedium">
        Don't have an account?{" "}
        <Link href="/signup" style={styles.signUp} asChild>
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.primary }}
            onPress={handleSubmit(onSubmit)}
          >
            Sign Up
          </Text>
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  signUp: {
    color: Colors.light.text,
    fontWeight: "bold",
  },
});
