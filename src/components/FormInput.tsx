import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "decimal-pad";
  currency?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  currency = false,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    {currency ? (
      <View style={styles.currencyContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.currencyInput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          placeholderTextColor={COLORS.textLight}
        />
      </View>
    ) : (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor={COLORS.textLight}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  label: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  currencySymbol: {
    paddingHorizontal: SPACING.sm,
    fontWeight: "bold",
    color: COLORS.text,
  },
  currencyInput: {
    flex: 1,
    padding: SPACING.sm,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
});
