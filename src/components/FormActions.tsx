import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";

interface FormActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitText: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  onSubmit,
  submitText,
}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
      <Text style={styles.cancelText}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.submitText}>{submitText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  cancelButton: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.xs,
    alignItems: "center",
  },
  cancelText: { color: COLORS.text },
  submitButton: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    marginLeft: SPACING.xs,
    alignItems: "center",
  },
  submitText: { color: COLORS.background, fontWeight: "bold" },
});
