import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Modal from "react-native-modal";

import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import { useStore } from "@/store/timers";
import { TimerCard } from "@/components/TimerCard";
import { useTheme } from "@/contexts/ThemeProvider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable } from "react-native-gesture-handler";
import { router, useNavigation } from "expo-router";
import * as Haptics from "expo-haptics";
import { Timer } from "@/types/timer";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { ThemedButton } from "@/components/ThemedButton";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { semanticColors, primarySemanticColor } = useTheme();
  const navigation = useNavigation();
  const timers = useStore((store) => store.data);
  const deleteData = useStore((store) => store.deleteData);

  const deleteTimer = (timer: Timer) => {
    Haptics.selectionAsync();
    Alert.alert(
      "タイマーを削除します。",
      `${timer.title || "名前未設定"}のタイマーを削除します。よろしいですか？`,
      [
        {
          text: "キャンセル",
          style: "cancel",
        },
        {
          text: "削除",
          style: "destructive",
          onPress: () => {
            deleteData(timer.id);
            navigation.goBack();
            Toast.show({
              type: "success",
              text1: "タイマーを削除しました",
              topOffset: Constants.statusBarHeight + 16,
              visibilityTime: 300,
            });
          },
        },
      ]
    );
  };

  const onPlay = () => {
    Haptics.selectionAsync();
    setModalVisible(true);
  };

  useEffect(() => {
    navigation.setOptions({ title: "ホーム" });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
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
                    onPress={() => deleteTimer(item)}
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
                <TimerCard data={item} onPlay={onPlay} />
              </Swipeable>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.flatListKey}
        />
      </Container>
      <Modal
        isVisible={isModalVisible}
        useNativeDriver
        useNativeDriverForBackdrop
        deviceWidth={width}
        deviceHeight={height}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{ margin: 0 }}
      >
        <View
          style={{
            width,
            height,
            backgroundColor: semanticColors?.gray.contrast,
          }}
        >
          <View style={{ height: 48, margin: 80 }}>
            <ThemedButton
              primaryColor={primarySemanticColor!}
              onPress={() => setModalVisible(false)}
            >
              閉じる
            </ThemedButton>
          </View>
        </View>
      </Modal>
    </View>
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
