import { Theme } from "@/types/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "theme";

const storeData = async (value: Theme) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (): Promise<Theme> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? "light" : (value as Theme);
  } catch (e) {
    return "light";
  }
};

export { storeData, getData };
