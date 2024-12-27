import { useTheme } from "@/contexts/ThemeProvider";
import { Text, type TextProps, StyleSheet } from "react-native";
import ColorTokens from "../assets/color_tokens.json";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "caption"
    | "button";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { semanticColors } = useTheme();
  return (
    <Text
      style={[
        { color: semanticColors?.text.fg },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "caption"
          ? [
              styles.caption,
              {
                color: semanticColors?.gray.focusRing,
              },
            ]
          : undefined,
        type === "button" ? styles.button : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: ColorTokens.blue[600],
  },
  caption: {
    opacity: 0.8,
    fontSize: 14,
    lineHeight: 16,
  },
  button: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "bold",
    color: ColorTokens.white,
  },
});
