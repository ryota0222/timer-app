import { Color } from "@/types/color";
import { Theme } from "@/types/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "primaryColor";

const storeData = async (value: Color) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (): Promise<Color> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? "blue" : (value as Color);
  } catch (e) {
    return "blue";
  }
};

export { storeData, getData };
