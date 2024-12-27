import { StyleSheet, Text, View, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/contexts/ThemeProvider";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import Container from "@/components/Container";

export default function HomeScreen() {
  const { toggleTheme, semanticColors, primitiveColors } = useTheme();
  const bottom = useBottomTabOverflow();

  return (
    <Container headerShown={false} scrollable={true}>
      <Button title="change theme" onPress={toggleTheme} />
      <ThemedView style={styles.titleContainer}>
        <Text>Semantic Color</Text>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        {[
          "text",
          "gray",
          "red",
          "pink",
          "purple",
          "cyan",
          "blue",
          "teal",
          "green",
          "yellow",
          "orange",
        ].map((color) => (
          <View style={{ paddingVertical: 8 }} key={color}>
            <Text style={{ marginBottom: 4 }}>{color}</Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
              {Object.keys(semanticColors[color]).map((key) => (
                <View key={key}>
                  <View
                    style={{
                      backgroundColor: semanticColors[color][key],
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                    }}
                  />
                  <Text style={{ fontSize: 10 }}>{key}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Text>Primitive Color</Text>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <View style={{ paddingVertical: 8 }}>
          <Text style={{ marginBottom: 4 }}>black</Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <View
              style={{
                backgroundColor: primitiveColors.black,
                width: 24,
                height: 24,
                borderRadius: 4,
              }}
            />
          </View>
        </View>
        <View style={{ paddingVertical: 8 }}>
          <Text style={{ marginBottom: 4 }}>white</Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <View
              style={{
                backgroundColor: primitiveColors.white,
                borderWidth: 1,
                borderColor: primitiveColors["gray"][300],
                width: 24,
                height: 24,
                borderRadius: 4,
              }}
            />
          </View>
        </View>
        {[
          "gray",
          "red",
          "pink",
          "purple",
          "cyan",
          "blue",
          "teal",
          "green",
          "yellow",
          "orange",
        ].map((color) => (
          <View style={{ paddingVertical: 8 }} key={color}>
            <Text style={{ marginBottom: 4 }}>{color}</Text>
            <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
              {[
                "50",
                "100",
                "200",
                "300",
                "400",
                "500",
                "600",
                "700",
                "800",
                "900",
              ].map((shade) => (
                <View key={shade}>
                  <View
                    style={{
                      backgroundColor: primitiveColors[color][shade],
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                    }}
                  />
                  <Text style={{ fontSize: 10 }}>{shade}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ThemedView>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
