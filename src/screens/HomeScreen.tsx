import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { ProductList } from '../components/ProductList';
import { ProductForm } from '../components/ProductForm';
import { RootState } from '../store/store';
import { 
  addProduct, 
  updateProduct, 
  setSelectedProduct,
  setError,
  clearError 
} from '../store/slices/productSlice';
import { MAX_PRODUCTS } from '../store/types/product.types';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { setupNotifications, sendLimitReachedNotification } from '../utils/notifications';
import { showLimitReachedToast, showProductAddedToast } from '../utils/toast';

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { products, error, selectedProduct } = useSelector((state: RootState) => state.products);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Show form if selectedProduct exists
  useEffect(() => {
    if (selectedProduct) {
      setShowForm(true);
    }
  }, [selectedProduct]);

  const handleAddPress = () => {
    if (products.length >= MAX_PRODUCTS) {
      showLimitReachedToast(); // Toast notification
    } else {
      // Clear any selected product and show form for new product
      dispatch(setSelectedProduct(null));
      setShowForm(true);
    }
  };

  const handleProductPress = (product: any) => {
    dispatch(setSelectedProduct(product));
  };

  const handleFormSubmit = (name: string, price: number, imageUri: string | null) => {
    if (selectedProduct) {
      // Update existing product
      const updatedProduct = {
        ...selectedProduct,
        name,
        price,
        imageUri,
      };
      dispatch(updateProduct(updatedProduct));
      showProductAddedToast(name); // Reuse success toast
    } else {
      // Add new product
      const newProduct = {
        id: Date.now().toString(),
        name,
        price,
        imageUri,
        createdAt: Date.now(),
      };
      dispatch(addProduct(newProduct));
      showProductAddedToast(name);
    }
    
    // Clear selection and hide form
    dispatch(setSelectedProduct(null));
    setShowForm(false);
  };

  const handleFormCancel = () => {
    dispatch(setSelectedProduct(null));
    setShowForm(false);
  };

  const isLimitReached = products.length >= MAX_PRODUCTS && !selectedProduct; // Allow editing even at limit

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Product Upload</Text>
          <Text style={styles.subtitle}>
            {products.length}/{MAX_PRODUCTS} products
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.addButton,
            isLimitReached && styles.addButtonDisabled
          ]}
          onPress={handleAddPress}
          activeOpacity={isLimitReached ? 1 : 0.8}
          disabled={isLimitReached}
        >
          <MaterialIcons 
            name={isLimitReached ? "warning" : "add"} 
            size={30} 
            color={COLORS.background} 
          />
        </TouchableOpacity>
      </View>

      {isLimitReached && !showForm && (
        <View style={styles.warningContainer}>
          <MaterialIcons name="info" size={20} color={COLORS.warning} />
          <Text style={styles.warningText}>
            Maximum products limit reached. Remove some products to add more.
          </Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {showForm ? (
        <ProductForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          initialProduct={selectedProduct}
        />
      ) : (
        <ProductList 
          products={products} 
          onProductPress={handleProductPress}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: COLORS.warning,
    opacity: 0.7,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warning + '15',
    padding: SPACING.sm,
    marginHorizontal: SPACING.sm,
    marginTop: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.warning + '30',
  },
  warningText: {
    ...TYPOGRAPHY.body,
    color: COLORS.warning,
    fontWeight: '500',
    flex: 1,
  },
  errorContainer: {
    backgroundColor: COLORS.danger,
    padding: SPACING.sm,
    margin: SPACING.sm,
    borderRadius: 8,
  },
  errorText: {
    color: COLORS.background,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});