import { Category } from "@/types/category";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const key = "categories";

export const defaultCategories: Category[] = [
  {
    id: "category1",
    label: "勉強",
    color: "#60a5fa",
  },
  {
    id: "category2",
    label: "料理",
    color: "#f472b6",
  },
  {
    id: "category3",
    label: "その他",
    color: "#a1a1aa",
  },
];

const storeData = async (value: Category[]) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

const addCategory = async ({
  label,
  color,
}: {
  label: string;
  color: string;
}) => {
  const categories = await getData();
  const id = uuid.v4();
  const newCategories = [...categories, { id, label, color }];
  storeData(newCategories);
  return newCategories;
};

const getData = async (): Promise<Category[]> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? defaultCategories : JSON.parse(value);
  } catch (e) {
    return defaultCategories;
  }
};

export { storeData, getData, addCategory };
