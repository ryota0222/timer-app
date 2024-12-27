import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeProvider";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  title: string;
}

export const ThemedModal = ({
  isVisible,
  onClose,
  title,
  children,
}: PropsWithChildren<Props>) => {
  const { semanticColors } = useTheme();
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver
      useNativeDriverForBackdrop
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="left"
    >
      <View
        style={{
          backgroundColor: semanticColors?.gray.contrast,
          padding: 16,
          borderRadius: 8,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText type="subtitle">{title}</ThemedText>
          <Pressable onPress={onClose}>
            <IconSymbol
              name="xmark.circle.fill"
              size={24}
              color={semanticColors!.text["fg.subtle"] || "gray"}
            />
          </Pressable>
        </View>
        <View style={{ paddingVertical: 16 }}>{children}</View>
      </View>
    </Modal>
  );
};
