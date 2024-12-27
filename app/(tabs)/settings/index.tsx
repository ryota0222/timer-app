import { Button, StyleSheet, View } from "react-native";
import ColorTokens from "../../../assets/color_tokens.json";

import { ThemedText } from "@/components/ThemedText";
import { Pressable, Switch } from "react-native-gesture-handler";
import Container from "@/components/Container";
import { useTheme } from "@/contexts/ThemeProvider";
import { PageLink } from "@/components/PageLink";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ActionLink } from "@/components/ActionLink";
import { ThemedButton } from "@/components/ThemedButton";
import { getData, storeData } from "@/store/countSetting";

export default function TabTwoScreen() {
  const {
    primitiveColors,
    semanticColors,
    primarySemanticColor,
    updatePrimaryColor,
    primaryColorName,
    theme,
    toggleTheme,
  } = useTheme();

  const [selectedColor, setSelectedColor] = useState<any>(primaryColorName);
  const navigation = useNavigation();

  const [settingOfCount, setSettingOfCount] = useState(true);

  useEffect(() => {
    getData().then((data) => {
      setSettingOfCount(data);
    });
  }, []);

  const selectableColorList = [
    "pink",
    "purple",
    "cyan",
    "blue",
    "green",
    "orange",
  ] as ("pink" | "purple" | "cyan" | "blue" | "green" | "orange")[];
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  );

  const toggleSettingOfCount = async () => {
    setSettingOfCount(!settingOfCount);
    await storeData(!settingOfCount);
  };

  useEffect(() => {
    navigation.setOptions({ title: "設定" });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Container scrollable headerShown={false}>
        <ThemedText type="title">設定</ThemedText>
        <View style={styles.section}>
          <View>
            <ThemedText type="caption">タイマー機能</ThemedText>
          </View>
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
            <ThemedText>バックグラウンドでのカウント</ThemedText>
            <Switch
              trackColor={{ true: primarySemanticColor?.solid }}
              onValueChange={toggleSettingOfCount}
              value={settingOfCount}
            />
          </View>
          <ActionLink
            selectedValue="シンプル"
            onPress={() => bottomSheetRef.current?.present()}
          >
            アラーム音
          </ActionLink>
        </View>
        <View style={styles.section}>
          <View>
            <ThemedText type="caption">サポート</ThemedText>
          </View>
          <PageLink href="/settings/support">お問い合わせ</PageLink>
        </View>
        <View style={styles.section}>
          <View>
            <ThemedText type="caption">その他</ThemedText>
          </View>
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
            <ThemedText>外観モード</ThemedText>
            <Switch
              trackColor={{ true: primarySemanticColor?.solid }}
              onValueChange={toggleTheme}
              value={theme === "dark"}
            />
          </View>
          <ActionLink onPress={() => bottomSheetRef.current?.present()}>
            カラー設定
          </ActionLink>
          <ActionLink
            icon="arrow.up.right"
            onPress={() => bottomSheetRef.current?.present()}
          >
            アプリを評価
          </ActionLink>
          <ActionLink
            icon="arrow.up.right"
            onPress={() => bottomSheetRef.current?.present()}
          >
            アプリを共有
          </ActionLink>
          <PageLink href="/settings/support">ライセンス</PageLink>
        </View>
        <View style={{ marginVertical: 32, alignItems: "center" }}>
          <ThemedText type="caption">v1.0.0</ThemedText>
        </View>
      </Container>
      <BottomSheetModal
        ref={bottomSheetRef}
        handleIndicatorStyle={{ backgroundColor: semanticColors?.gray.fg }}
        backgroundStyle={{ backgroundColor: semanticColors?.gray.contrast }}
        backdropComponent={renderBackdrop}
        onDismiss={() => setSelectedColor(primaryColorName)}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={{ paddingBottom: 64 }}>
            <ThemedText type="default">
              テーマカラーを選択してください
            </ThemedText>
            <View style={styles.colorList}>
              {selectableColorList.map((color) => (
                <Pressable key={color} onPress={() => setSelectedColor(color)}>
                  <View
                    key={color}
                    style={[
                      styles.colorButton,
                      {
                        backgroundColor: primitiveColors![color]["400"],
                        borderColor:
                          selectedColor === color
                            ? primitiveColors!.blue[200]
                            : semanticColors?.gray.contrast,
                      },
                    ]}
                  />
                </Pressable>
              ))}
            </View>
            <ThemedButton
              onPress={() => {
                updatePrimaryColor(selectedColor);
                bottomSheetRef.current?.close();
              }}
              primaryColor={(semanticColors as any)[selectedColor]}
            >
              更新
            </ThemedButton>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  colorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 32,
    gap: 8,
  },
  colorButton: {
    height: 32,
    width: 32,
    borderRadius: 10,
    borderWidth: 4,
  },
  section: {
    gap: 8,
    marginTop: 24,
    width: "100%",
  },
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
