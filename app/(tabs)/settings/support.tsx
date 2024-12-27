import { View } from "react-native";
import Container from "@/components/Container";
import { useTheme } from "@/contexts/ThemeProvider";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";

export default function TabTwoScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <ThemedText
          style={{
            color: theme === "dark" ? "#FFF" : "#333",
            fontWeight: "bold",
          }}
        >
          お問い合わせ
        </ThemedText>
      ),
      headerStyle: {
        backgroundColor: theme === "dark" ? "#333" : "#fff",
      },
    });
  }, [navigation]);

  return (
    <Container scrollable headerShown={true}>
      <View style={{ flex: 1, paddingTop: 20 }}></View>
    </Container>
  );
}
