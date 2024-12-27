import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import ColorTokens from "../assets/color_tokens.json";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeProvider";
import { PropsWithChildren } from "react";
import { Href, Link } from "expo-router";

interface Props {
  href: Href;
}

export const PageLink = ({ href, children }: PropsWithChildren<Props>) => {
  const { primitiveColors, semanticColors, theme } = useTheme();
  return (
    <Link href={href} asChild>
      <Pressable>
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
          <IconSymbol
            name="chevron.right"
            size={16}
            color={primitiveColors!.gray[400]}
          />
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: ColorTokens.gray[50],
    borderRadius: 8,
  },
});
