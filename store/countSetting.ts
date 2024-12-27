import { Theme } from "@/types/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "settingOfCount";

const storeData = async (value: boolean) => {
  try {
    await AsyncStorage.setItem(key, Number(value).toString());
  } catch (e) {
    // saving error
  }
};

const getData = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? true : Boolean(Number(value));
  } catch (e) {
    return true;
  }
};

export { storeData, getData };
