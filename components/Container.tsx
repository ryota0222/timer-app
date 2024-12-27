import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useTheme } from "@/contexts/ThemeProvider";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  headerShown: boolean;
  scrollable: boolean;
}

export default function Container({
  children,
  headerShown,
  scrollable,
}: PropsWithChildren<Props>) {
  const { theme } = useTheme();
  const backgroundColor = theme === "dark" ? "#333" : "#fff";
  const bottom = useBottomTabOverflow();

  if (headerShown) {
    return (
      <View style={{ backgroundColor, ...styles.container }}>
        {scrollable ? (
          <ScrollView>{children}</ScrollView>
        ) : (
          <View
            style={[
              styles.nonScrollable,
              {
                paddingBottom: bottom,
              },
            ]}
          >
            {children}
          </View>
        )}
      </View>
    );
  }
  return (
    <SafeAreaView style={{ backgroundColor, ...styles.container }}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: bottom,
          }}
          scrollIndicatorInsets={{ bottom }}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.nonScrollable,
            {
              paddingBottom: bottom,
            },
          ]}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nonScrollable: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
});
