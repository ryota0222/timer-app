import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { getData } from "@/store/timers";
import { Timer } from "@/types/timer";
import { TimerCard } from "@/components/TimerCard";
import { useTheme } from "@/contexts/ThemeProvider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "react-native-gesture-handler";
import { router, useNavigation } from "expo-router";
import * as Haptics from "expo-haptics";

export default function HomeScreen() {
  const { semanticColors, primarySemanticColor } = useTheme();
  const [timers, setTimers] = useState<Timer[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getData().then((data) => {
      setTimers(data);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: "ホーム" });
  }, [navigation]);

  return (
    <Container scrollable={false} headerShown={false}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">タイマー</ThemedText>
        <Pressable
          onPress={() => {
            Haptics.selectionAsync();
            router.push(`/create`);
          }}
          style={[
            styles.addButton,
            {
              backgroundColor: primarySemanticColor?.solid,
            },
          ]}
        >
          <IconSymbol name="plus" size={18} color="white" />
        </Pressable>
      </View>
      <FlatList
        data={timers}
        renderItem={({ item }) => (
          <View
            style={[
              styles.swiperContainer,
              {
                backgroundColor: semanticColors?.gray.subtle,
              },
            ]}
          >
            <Swipeable
              renderRightActions={() => (
                <Pressable
                  onPress={() => {
                    Alert.alert("Delete", "Delete the timer");
                  }}
                  style={[
                    styles.deleteAction,
                    {
                      backgroundColor: semanticColors?.red.solid,
                    },
                  ]}
                >
                  <IconSymbol name="trash.fill" color="white" />
                  <Text style={styles.actionLabel}>削除</Text>
                </Pressable>
              )}
            >
              <TimerCard data={item} />
            </Swipeable>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.flatListKey}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAction: {
    width: 80,
    borderTopEndRadius: 8,
    borderBottomEndRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListKey: { marginTop: 24 },
  swiperContainer: {
    marginVertical: 8,
    borderRadius: 8,
  },
  actionLabel: { marginTop: 8, color: "white" },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
