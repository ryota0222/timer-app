import { StyleSheet, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native-gesture-handler";

export default function HistoryScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <Text>Semantic Color</Text>
        <HelloWave />
      </ThemedView>
    </ScrollView>
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
