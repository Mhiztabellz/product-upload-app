import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";

interface ImagePickerWithPreviewProps {
  imageUri: string | null;
  onImageSelect: (uri: string) => void;
  onImageRemove: () => void;
}

export const ImagePickerWithPreview: React.FC<ImagePickerWithPreviewProps> = ({
  imageUri,
  onImageSelect,
  onImageRemove,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Camera roll permission needed");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelect(result.assets[0].uri);
        setPreviewVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Camera permission needed");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelect(result.assets[0].uri);
        setPreviewVisible(true);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const showImageOptions = () => {
    Alert.alert("Add Photo", "Choose an option", [
      { text: "Cancel", style: "cancel" },
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Library", onPress: pickImage },
    ]);
  };

  const handleUsePhoto = () => setPreviewVisible(false);
  const handleTakeNew = () => {
    setPreviewVisible(false);
    setTimeout(showImageOptions, 300);
  };
  const handleDiscard = () => {
    onImageRemove();
    setPreviewVisible(false);
  };

  return (
    <>
      <Modal visible={previewVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setPreviewVisible(false)}>
              <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Preview</Text>
            <View style={{ width: 40 }} />
          </View>

          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.modalImage} />
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.retakeButton]}
              onPress={handleTakeNew}
            >
              <MaterialIcons
                name="camera-alt"
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.retakeButtonText}>Take New</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.useButton]}
              onPress={handleUsePhoto}
            >
              <MaterialIcons
                name="check-circle"
                size={24}
                color={COLORS.background}
              />
              <Text style={styles.useButtonText}>Use This</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.discardButton}
            onPress={handleDiscard}
          >
            <MaterialIcons name="delete" size={20} color={COLORS.danger} />
            <Text style={styles.discardText}>Discard</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={imageUri ? () => setPreviewVisible(true) : showImageOptions}
      >
        {imageUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.overlay}>
              <MaterialIcons
                name="zoom-in"
                size={24}
                color={COLORS.background}
              />
              <Text style={styles.overlayText}>Preview</Text>
            </View>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons
              name="add-a-photo"
              size={50}
              color={COLORS.primary}
            />
            <Text style={styles.placeholderText}>Add Photo</Text>
            <Text style={styles.placeholderSubText}>Tap to select</Text>
          </View>
        )}
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.actions}>
          <ActionButton
            icon="remove-red-eye"
            text="Preview"
            onPress={() => setPreviewVisible(true)}
          />
          <ActionButton
            icon="cached"
            text="Change"
            onPress={showImageOptions}
          />
          <ActionButton
            icon="delete"
            text="Remove"
            onPress={onImageRemove}
            danger
          />
        </View>
      )}
    </>
  );
};

const ActionButton: React.FC<{
  icon: string;
  text: string;
  onPress: () => void;
  danger?: boolean;
}> = ({ icon, text, onPress, danger }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <MaterialIcons
      name={icon}
      size={20}
      color={danger ? COLORS.danger : COLORS.primary}
    />
    <Text style={[styles.actionText, danger && { color: COLORS.danger }]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imagePicker: { marginBottom: SPACING.sm },
  imageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: { width: "100%", height: 200, resizeMode: "cover" },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: COLORS.background,
    marginTop: SPACING.xs,
    fontWeight: "600",
  },
  placeholder: {
    height: 200,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: "dashed",
  },
  placeholderText: {
    color: COLORS.primary,
    fontWeight: "600",
    marginTop: SPACING.sm,
  },
  placeholderSubText: { color: COLORS.textLight, marginTop: SPACING.xs },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: SPACING.lg,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.xs,
    gap: SPACING.xs,
  },
  actionText: { color: COLORS.primary, fontWeight: "500" },
  modalContainer: { flex: 1, backgroundColor: COLORS.background },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.text },
  modalImage: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    backgroundColor: COLORS.surface,
  },
  modalActions: { flexDirection: "row", padding: SPACING.lg, gap: SPACING.md },
  modalButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
    borderRadius: 8,
    gap: SPACING.sm,
  },
  retakeButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  retakeButtonText: { color: COLORS.primary, fontWeight: "600" },
  useButton: { backgroundColor: COLORS.primary },
  useButtonText: { color: COLORS.background, fontWeight: "600" },
  discardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.sm,
    gap: SPACING.xs,
  },
  discardText: { color: COLORS.danger },
});
