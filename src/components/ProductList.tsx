import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Product } from '../store/types/product.types';
import { ProductCard } from './ProductCard';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

interface ProductListProps {
  products: Product[];
  onProductPress: (product: Product) => void; // Add this prop
}

export const ProductList: React.FC<ProductListProps> = ({ products, onProductPress }) => {
  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products yet</Text>
        <Text style={styles.emptySubtext}>Tap the + button to add your first product</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard 
          product={item} 
          onPress={() => onProductPress(item)}
        />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    ...TYPOGRAPHY.body,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});