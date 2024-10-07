import { Colors } from "@/constants/Colors";
import { signupSchema } from "@/constants/shemas";
import { RootParamsList } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavigationProp } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function Signup() {
  const navigation = useNavigation<NavigationProp<RootParamsList>>();
  const theme = useTheme();
  const handleSignup = () => {
    navigation.navigate("home");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("signup");
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium">Create an account</Text>
      <Text variant="bodyMedium">Name</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            dense
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="name"
        defaultValue=""
      />
      {errors.name && <Text>This is required.</Text>}
      <Text variant="bodyMedium">Email</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            dense
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && <Text>This is required.</Text>}
      <Text variant="bodyMedium">Password</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            secureTextEntry={true}
            dense
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
        Create Account
      </Button>
      <Text variant="bodyMedium">
        Already have an account?{" "}
        <Link href="/" style={styles.signUp} asChild>
          <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
            Sign In
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
