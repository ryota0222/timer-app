import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeProvider";
import { Timer } from "@/types/timer";
import { useMemo } from "react";
import { Text, View, Pressable, Alert, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

interface Props {
  data: Timer;
  onPlay: () => void;
}

export const TimerCard = ({ data, onPlay }: Props) => {
  const { semanticColors, primarySemanticColor } = useTheme();

  const timeLabel = useMemo(() => {
    const hours = Math.floor(data.seconds / 3600);
    const minutes = Math.floor((data.seconds % 3600) / 60);
    const seconds = data.seconds % 60;
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    }
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }, [data.seconds]);

  const gotoDetail = () => {
    Haptics.selectionAsync();
    router.push(`/(tabs)/(timer)/detail?id=${data.id}`);
  };

  return (
    <Pressable onPress={gotoDetail}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: semanticColors?.gray.subtle,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.title,
              {
                color: semanticColors?.text["fg.muted"],
                opacity: data.title ? 1 : 0.6,
              },
            ]}
          >
            {data.title || "名前未設定"}
          </Text>
          <Text style={[styles.timeLabel, { color: semanticColors?.text.fg }]}>
            {timeLabel}
          </Text>
          {data.category !== null && (
            <View style={styles.categoryText}>
              <View
                style={[
                  styles.category,
                  { backgroundColor: data.category.color },
                ]}
              />
              <ThemedText type="caption">{data.category.label}</ThemedText>
            </View>
          )}
        </View>
        <Pressable onPress={onPlay}>
          <View
            style={[
              styles.playButton,
              {
                backgroundColor: primarySemanticColor?.solid,
              },
            ]}
          >
            <IconSymbol name="play.fill" color="white" size={16} />
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    width: 12,
    height: 12,
    borderRadius: 4,
  },
  categoryText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  timeLabel: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "dseg",
    marginTop: 4,
  },
  title: {
    marginBottom: 4,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
