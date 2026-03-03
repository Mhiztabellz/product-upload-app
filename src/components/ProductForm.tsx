import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { ImagePickerWithPreview } from '../components/ImagePickerWithPreview';
import { FormInput } from '../components/FormInput';
import { FormActions } from '../components/FormActions';

interface ProductFormProps {
  onSubmit: (name: string, price: number, imageUri: string | null) => void;
  onCancel: () => void;
  initialProduct?: any;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel, initialProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setPrice(initialProduct.price.toString());
      setImageUri(initialProduct.imageUri);
    }
  }, [initialProduct]);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a product name');
      return;
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }
    onSubmit(name.trim(), priceNum, imageUri);
    setName('');
    setPrice('');
    setImageUri(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {initialProduct ? 'Edit Product' : 'Add New Product'}
      </Text>

      <ImagePickerWithPreview
        imageUri={imageUri}
        onImageSelect={setImageUri}
        onImageRemove={() => setImageUri(null)}
      />

      <FormInput
        label="Product Name *"
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />

      <FormInput
        label="Price *"
        value={price}
        onChangeText={setPrice}
        placeholder="0.00"
        currency
      />

      <FormActions
        onCancel={onCancel}
        onSubmit={handleSubmit}
        submitText={initialProduct ? 'Update Product' : 'Add Product'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.md },
  title: { ...TYPOGRAPHY.h2, color: COLORS.text, marginBottom: SPACING.lg },
});