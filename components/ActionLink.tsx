import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import ColorTokens from "../assets/color_tokens.json";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeProvider";
import { PropsWithChildren } from "react";
import { Pressable } from "react-native-gesture-handler";

interface Props {
  onPress: () => void;
  icon?: "arrow.up.right" | "chevron.right";
  selectedValue?: string;
}

export const ActionLink = ({
  onPress,
  icon = "chevron.right",
  selectedValue,
  children,
}: PropsWithChildren<Props>) => {
  const { primitiveColors, semanticColors, theme } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.linkContainer,
          {
            backgroundColor:
              theme === "dark"
                ? semanticColors?.gray.muted
                : semanticColors?.gray.subtle,
          },
        ]}
      >
        <ThemedText>{children}</ThemedText>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {selectedValue && <ThemedText>{selectedValue}</ThemedText>}
          <IconSymbol
            name={icon}
            size={16}
            color={primitiveColors!.gray[400]}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
