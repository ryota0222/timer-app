import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeProvider";
import { Category } from "@/types/category";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

interface Props {
  category: Category;
  selectedCategory: Category | null;
  onPress: () => void;
}

export const CategoryItem = ({
  category,
  selectedCategory,
  onPress,
}: Props) => {
  const { semanticColors, primarySemanticColor } = useTheme();
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: semanticColors?.gray.subtle,
        },
      ]}
      key={category.id}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View
          style={[
            styles.category,
            {
              backgroundColor: category.color,
            },
          ]}
        />
        <ThemedText>{category.label}</ThemedText>
      </View>
      {category.id === selectedCategory?.id && (
        <IconSymbol
          name="checkmark.circle.fill"
          size={22}
          color={primarySemanticColor!.solid}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  category: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
    gap: 8,
    borderRadius: 8,
  },
});
