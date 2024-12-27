import * as Haptics from "expo-haptics";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";
import { PropsWithChildren } from "react";
import { SemanticColorTokens } from "@/types/color";
import { useTheme } from "@/contexts/ThemeProvider";

export type ThemedButtonProps = {
  onPress: () => void;
  primaryColor: SemanticColorTokens;
  isDisabled?: boolean;
};

export function ThemedButton({
  onPress,
  primaryColor,
  isDisabled = false,
  children,
}: PropsWithChildren<ThemedButtonProps>) {
  const { semanticColors } = useTheme();
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: isDisabled
              ? semanticColors?.text["fg.subtle"]
              : primaryColor.solid,
          },
        ]}
        onPress={() => {
          Haptics.selectionAsync();
          onPress();
        }}
      >
        <ThemedText type="button">{children}</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    height: 48,
    borderRadius: 24,
  },
  container: {
    minHeight: 48,
    flex: 1,
  },
});
