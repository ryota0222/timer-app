import SemanticColors from "../assets/semantic_colors.json";
import ColorTokens from "../assets/color_tokens.json";
import { StatusBar } from "expo-status-bar";
import {
  getData as getThemeData,
  storeData as storeThemeData,
} from "@/store/theme";
import {
  getData as getPrimaryData,
  storeData as storePrimaryData,
} from "@/store/primaryColor";
import { Theme } from "@/types/theme";
import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import type {
  Color,
  PrimitiveColors,
  PrimitiveColorShades,
  SemanticColorTokens,
  SemanticThemeColors,
} from "@/types/color";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Text, View } from "react-native";
import { BlurView } from "expo-blur";

const replaceColorToken = (
  theme: "light" | "dark"
): Record<string, Record<string, string>> => {
  const semanticColorData = SemanticColors[theme] as any;

  return Object.keys(semanticColorData).reduce((acc, key) => {
    const value = semanticColorData[key];

    acc[key] = Object.keys(value).reduce((acc2, key2) => {
      const token = value[key2];

      if (token?.includes(".")) {
        const [colorName, colorNumber] = token.split(".") as [
          keyof PrimitiveColors,
          keyof PrimitiveColorShades
        ];
        acc2[key2] = ColorTokens[colorName][colorNumber];
      } else {
        acc2[key2] = ColorTokens[token as keyof PrimitiveColors] as any;
      }
      return acc2;
    }, {} as Record<string, string>);

    return acc;
  }, {} as Record<string, Record<string, string>>);
};

interface ThemeContextType {
  theme: Theme;
  semanticColors: SemanticThemeColors | null;
  primaryPrimitiveColor: PrimitiveColorShades | null;
  primarySemanticColor: SemanticColorTokens | null;
  primitiveColors: PrimitiveColors | null;
  primaryColorName: Color;
  toggleTheme: () => void;
  updatePrimaryColor: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  semanticColors: null,
  primaryPrimitiveColor: null,
  primarySemanticColor: null,
  primitiveColors: null,
  primaryColorName: "blue",
  updatePrimaryColor: () => {},
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [primaryColorName, setPrimaryColorName] = useState<Color>("blue");

  useEffect(() => {
    (async () => {
      setTheme(await getThemeData());
      setPrimaryColorName(await getPrimaryData());
    })();
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    storeThemeData(newTheme);
  }, [theme]);

  const updatePrimaryColor = useCallback((color: Color) => {
    setPrimaryColorName(color);
    storePrimaryData(color);
  }, []);

  const semanticColors = useMemo(
    () => replaceColorToken(theme) as SemanticThemeColors,
    [theme, replaceColorToken]
  );

  const primaryPrimitiveColor = useMemo(
    () => (ColorTokens as any)[primaryColorName] as PrimitiveColorShades,
    [primaryColorName]
  );

  const primarySemanticColor = useMemo(
    () => semanticColors[primaryColorName],
    [semanticColors, primaryColorName]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        primaryPrimitiveColor,
        primarySemanticColor,
        semanticColors,
        primitiveColors: ColorTokens,
        primaryColorName,
        toggleTheme,
        updatePrimaryColor,
      }}
    >
      {children}
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Toast
        config={{
          success: (props) => (
            <View
              style={{
                width: "92%",
                shadowColor: "#666",
                shadowOpacity: 0.25,
                shadowRadius: 6,
                elevation: 5,
              }}
            >
              <View
                style={{
                  width: "100%",
                  borderRadius: 8,
                  borderLeftColor: "#5eead4",
                  borderLeftWidth: 4,
                  overflow: "hidden",
                }}
              >
                <BlurView
                  intensity={48}
                  tint={theme === "dark" ? "dark" : "light"}
                  style={{
                    padding: 16,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: theme === "dark" ? "#fff" : "#000",
                    }}
                  >
                    {props.text1}
                  </Text>
                  {props.text2 && (
                    <Text
                      style={{
                        color: theme === "dark" ? "#fff" : "#000",
                        fontSize: 14,
                        opacity: 0.7,
                        marginTop: 4,
                      }}
                    >
                      {props.text2}
                    </Text>
                  )}
                </BlurView>
              </View>
            </View>
          ),
          error: (props) => (
            <ErrorToast
              {...props}
              text1Style={{
                fontSize: 17,
              }}
              text2Style={{
                fontSize: 15,
              }}
            />
          ),
        }}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
