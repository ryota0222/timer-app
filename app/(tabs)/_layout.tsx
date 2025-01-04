import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useTheme } from "@/contexts/ThemeProvider";
import { useStore } from "@/store/timers";

export default function TabLayout() {
  const { primaryPrimitiveColor, theme } = useTheme();
  const fetchTimers = useStore((store) => store.fetch);

  useEffect(() => {
    fetchTimers();
  }, []);

  return (
    <Tabs
      initialRouteName="(timer)"
      screenOptions={{
        tabBarActiveTintColor:
          theme === "light"
            ? primaryPrimitiveColor?.[500]
            : primaryPrimitiveColor?.[400],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "最近使用",
          tabBarIcon: ({ color }) => (
            <View style={{ paddingBottom: 4 }}>
              <IconSymbol size={24} name="clock.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="(timer)"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color }) => (
            <View style={{ paddingBottom: 4 }}>
              <IconSymbol size={24} name="house.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="color"
        options={{
          title: "色",
          tabBarIcon: ({ color }) => (
            <View style={{ paddingBottom: 4 }}>
              <IconSymbol size={24} name="swatchpalette.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarIcon: ({ color }) => (
            <View style={{ paddingBottom: 4 }}>
              <IconSymbol size={24} name="gearshape.fill" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
