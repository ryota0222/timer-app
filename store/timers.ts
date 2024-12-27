import { defaultCategories } from "@/store/categories";
import { Category } from "@/types/category";
import { Timer } from "@/types/timer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { create } from "zustand";

const key = "timers";

const defaultTimers: Timer[] = [
  {
    id: "example1",
    title: "",
    category: defaultCategories.find(
      (category) => category.id === "category3"
    )!,
    seconds: 300,
    sortIndex: 2,
  },
  {
    id: "example2",
    title: "",
    category: defaultCategories.find(
      (category) => category.id === "category3"
    )!,
    seconds: 60,
    sortIndex: 1,
  },
  {
    id: "example3",
    title: "",
    category: defaultCategories.find(
      (category) => category.id === "category3"
    )!,
    seconds: 30,
    sortIndex: 0,
  },
];

const storeData = async (value: Timer[]) => {
  try {
    await AsyncStorage.setItem(
      key,
      JSON.stringify(
        value.map((timer) => ({
          ...timer,
          category: timer?.category?.id || "",
        }))
      )
    );
  } catch (e) {
    // saving error
  }
};

const getData = async (): Promise<Timer[]> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null
      ? defaultTimers
      : JSON.parse(value)
          .map((timer: any) => {
            return {
              ...timer,
              category:
                defaultCategories.find(
                  (category) => category.id === timer.category
                ) || null,
            };
          })
          .sort((a: Timer, b: Timer) => b.sortIndex - a.sortIndex);
  } catch (e) {
    return defaultTimers;
  }
};

const updateTimer = async (newTimer: Timer) => {
  const timers = await getData();
  const index = timers.findIndex((timer) => timer.id === newTimer.id);
  timers[index] = newTimer;
  storeData(timers);
  return timers;
};

const deleteTimer = async (id: string) => {
  const timers = await getData();
  const newTimers = timers.filter((timer) => timer.id !== id);
  storeData(newTimers);
  return newTimers;
};

const addTimer = async ({
  title,
  category,
  seconds,
}: {
  title: string;
  category: Category | null;
  seconds: number;
}) => {
  const timers = await getData();
  const id = uuid.v4();
  const maxSortIndex = timers.reduce(
    (acc, timer) => Math.max(acc, timer.sortIndex),
    -1
  );
  console.log("timer: ", {
    id,
    title,
    category,
    seconds,
    sortIndex: maxSortIndex + 1,
  });
  const newTimers = [
    ...timers,
    { id, title, category, seconds, sortIndex: maxSortIndex + 1 },
  ];
  storeData(newTimers);
  return newTimers;
};

export const useStore = create((set) => ({
  data: null,
  fetch: async () => {
    const storedData = await getData();
    set({ data: storedData });
  },
  updateData: async (newData: Timer) => {
    const updatedData = await updateTimer(newData);
    set({ data: updatedData });
  },
  clearData: async () => {
    await AsyncStorage.removeItem("myData");
    set({ data: null });
  },
}));
