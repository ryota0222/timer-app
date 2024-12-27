import { StyleSheet, Text, View } from "react-native";
import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import { useCallback, useEffect, useRef, useState } from "react";
import { addTimer } from "@/store/timers";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/contexts/ThemeProvider";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { ThemedButton } from "@/components/ThemedButton";
import { Category } from "@/types/category";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { addCategory, getData } from "@/store/categories";
import { CategoryItem } from "@/components/CategoryItem";
import { ThemedModal } from "@/components/ui/Modal";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";

export default function CreateScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { theme, semanticColors, primarySemanticColor, primitiveColors } =
    useTheme();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState<string | null>(null);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [name, onChangeName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [pendingCategory, setPendingCategory] = useState<Category | null>(null);

  const selectableColorList = [
    "red",
    "pink",
    "purple",
    "cyan",
    "teal",
    "blue",
    "green",
    "yellow",
    "orange",
  ] as (
    | "pink"
    | "purple"
    | "cyan"
    | "blue"
    | "green"
    | "orange"
    | "yellow"
    | "red"
    | "teal"
  )[];

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

  const clearNewCategory = () => {
    setNewCategoryName("");
    setNewCategoryColor(null);
  };

  const onCreateCategory = async () => {
    const categories = await addCategory({
      label: newCategoryName,
      color: newCategoryColor!,
    });
    setCategories(categories);
    clearNewCategory();
    setModalVisible(false);
  };

  const createTimerData = async () => {
    Haptics.selectionAsync();
    await addTimer({
      title: name,
      seconds: hour * 60 * 60 + minute * 60 + second,
      category: category,
    });
    Toast.show({
      type: "success",
      text1: "タイマーを作成しました",
      topOffset: Constants.statusBarHeight + 16,
      visibilityTime: 3000,
    });
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ThemedText
          style={{
            color: theme === "dark" ? "#FFF" : "#333",
            fontWeight: "bold",
          }}
        >
          タイマーの作成
        </ThemedText>
      ),
      headerShown: true,
      headerStyle: {
        backgroundColor: theme === "dark" ? "#333" : "#fff",
      },
    });
  }, [navigation, theme]);

  useEffect(() => {
    getData().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Container scrollable={false} headerShown={true}>
        <View style={styles.timeContainer}>
          <Picker
            style={styles.pickerContainer}
            itemStyle={[styles.time, { color: semanticColors?.text.fg }]}
            selectedValue={hour}
            onValueChange={(itemValue) => setHour(itemValue)}
          >
            {[...Array(11).keys()].map((i) => (
              <Picker.Item key={i} label={String(i)} value={i} />
            ))}
          </Picker>
          <Text
            style={[
              styles.coron,
              {
                color: semanticColors?.gray.fg,
              },
            ]}
          >
            時間
          </Text>
          <Picker
            style={styles.pickerContainer}
            itemStyle={[styles.time, { color: semanticColors?.text.fg }]}
            selectedValue={minute}
            onValueChange={(itemValue) => setMinute(itemValue)}
          >
            {[...Array(60).keys()].map((i) => (
              <Picker.Item key={i} label={String(i)} value={i} />
            ))}
          </Picker>
          <Text
            style={[
              styles.coron,
              {
                color: semanticColors?.gray.fg,
              },
            ]}
          >
            分
          </Text>
          <Picker
            style={styles.pickerContainer}
            itemStyle={[styles.time, { color: semanticColors?.text.fg }]}
            selectedValue={second}
            onValueChange={(itemValue) => setSecond(itemValue)}
          >
            {[...Array(60).keys()].map((i, index) => (
              <Picker.Item key={index} label={String(index)} value={index} />
            ))}
          </Picker>
          <Text
            style={[
              styles.coron,
              {
                color: semanticColors?.gray.fg,
              },
            ]}
          >
            秒
          </Text>
        </View>
        <View>
          <ThemedText type="caption">名前</ThemedText>
          <TextInput
            editable
            maxLength={40}
            onChangeText={(text) => onChangeName(text)}
            value={name}
            placeholder="名前未設定"
            placeholderTextColor={semanticColors?.text["fg.subtle"]}
            style={[
              styles.textInput,
              {
                color: semanticColors?.text.fg,
                backgroundColor:
                  theme === "dark" ? "#3F3F41" : semanticColors?.gray.subtle,
              },
            ]}
          />
          <ThemedText
            type="caption"
            style={{ textAlign: "right", marginTop: 4 }}
          >
            {name.length} / 40
          </ThemedText>
        </View>
        <View style={{ marginTop: 12 }}>
          <ThemedText type="caption">カテゴリ</ThemedText>
          <Pressable
            onPress={() => bottomSheetRef.current?.present()}
            style={[
              styles.textInput,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor:
                  theme === "dark" ? "#3F3F41" : semanticColors?.gray.subtle,
              },
            ]}
          >
            {category ? (
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <View
                  style={[styles.category, { backgroundColor: category.color }]}
                />
                <ThemedText type="caption">{category.label}</ThemedText>
              </View>
            ) : (
              <Text
                style={{
                  color: semanticColors?.text["fg.subtle"],
                }}
              >
                未設定
              </Text>
            )}
            <View style={{ transform: [{ rotate: "90deg" }] }}>
              <IconSymbol
                name="chevron.right"
                size={16}
                color={semanticColors!.text["fg.subtle"] || "gray"}
              />
            </View>
          </Pressable>
        </View>
        <View style={{ marginTop: 40 }}>
          <ThemedButton
            onPress={createTimerData}
            primaryColor={primarySemanticColor!}
          >
            作成
          </ThemedButton>
        </View>
      </Container>
      <BottomSheetModal
        ref={bottomSheetRef}
        handleIndicatorStyle={{ backgroundColor: semanticColors?.gray.fg }}
        backgroundStyle={{ backgroundColor: semanticColors?.gray.contrast }}
        backdropComponent={renderBackdrop}
        onDismiss={() => setPendingCategory(category)}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={{ paddingBottom: 64 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ThemedText type="subtitle">カテゴリ</ThemedText>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setModalVisible(true);
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
            <View style={{ marginBottom: 24, gap: 8, marginVertical: 16 }}>
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setPendingCategory(category);
                  }}
                  selectedCategory={pendingCategory}
                />
              ))}
            </View>
            <ThemedButton
              onPress={() => {
                Haptics.selectionAsync();
                setCategory(pendingCategory);
                bottomSheetRef.current?.close();
              }}
              primaryColor={primarySemanticColor!}
            >
              設定
            </ThemedButton>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <ThemedModal
        isVisible={isModalVisible}
        title="カテゴリの追加"
        onClose={() => {
          setModalVisible(false);
          clearNewCategory();
        }}
      >
        <View>
          <ThemedText type="caption">名前</ThemedText>
          <TextInput
            editable
            maxLength={40}
            onChangeText={(text) => setNewCategoryName(text)}
            value={newCategoryName}
            placeholder="名前未設定"
            placeholderTextColor={semanticColors?.text["fg.subtle"]}
            style={[
              styles.textInput,
              {
                color: semanticColors?.text.fg,
                backgroundColor:
                  theme === "dark" ? "#3F3F41" : semanticColors?.gray.subtle,
              },
            ]}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <ThemedText type="caption">カラー</ThemedText>
          <View style={styles.colorList}>
            {selectableColorList.map((color) => (
              <Pressable key={color} onPress={() => setNewCategoryColor(color)}>
                <View
                  key={color}
                  style={[
                    styles.colorButton,
                    {
                      backgroundColor: primitiveColors![color]["400"],
                      borderColor:
                        newCategoryColor === color
                          ? primitiveColors!.blue[200]
                          : semanticColors?.gray.contrast,
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{ height: 48, marginTop: 24 }}>
          <ThemedButton
            onPress={onCreateCategory}
            isDisabled={Boolean(
              !newCategoryColor?.length || !newCategoryName.length
            )}
            primaryColor={primarySemanticColor!}
          >
            追加
          </ThemedButton>
        </View>
      </ThemedModal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteAction: {
    width: 90,
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
  time: { fontFamily: "dseg", fontSize: 16 },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  pickerContainer: {
    width: 88,
  },
  coron: {
    fontSize: 14,
  },
  textInput: {
    borderRadius: 8,
    padding: 16,
    marginTop: 4,
  },
  category: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  colorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 8,
  },
  colorButton: {
    height: 32,
    width: 32,
    borderRadius: 10,
    borderWidth: 4,
  },
});
