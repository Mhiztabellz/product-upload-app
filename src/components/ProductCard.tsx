import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Product } from '../store/types/product.types';
import { removeProduct, setSelectedProduct } from '../store/slices/productSlice';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { showProductDeletedToast } from '../utils/toast';

interface ProductCardProps {
  product: Product;
  onPress: () => void; // Add onPress prop
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeProduct(product.id));
            showProductDeletedToast(product.name);
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {product.imageUri ? (
        <Image source={{ uri: product.imageUri }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <MaterialIcons name="image" size={40} color={COLORS.textLight} />
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.date}>
          Added: {new Date(product.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color={COLORS.danger} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  placeholderImage: {
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: SPACING.sm,
    justifyContent: 'center',
  },
  name: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  price: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  date: {
    ...TYPOGRAPHY.caption,
  },
  deleteButton: {
    padding: SPACING.xs,
    justifyContent: 'center',
  },
});