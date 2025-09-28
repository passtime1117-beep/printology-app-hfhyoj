
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { mockProducts } from '@/data/mockData';
import { Size, Color, CartItem } from '@/types';
import { useApp } from '@/contexts/AppContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  imageContainer: {
    height: 300,
    backgroundColor: colors.backgroundAlt,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productInfo: {
    paddingVertical: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  description: {
    fontSize: 16,
    color: colors.grey,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    minWidth: 60,
    alignItems: 'center',
  },
  sizeOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  sizeTextSelected: {
    color: '#FFFFFF',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  colorName: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
  },
  fabricInfo: {
    backgroundColor: colors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fabricText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    marginTop: 8,
  },
});

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart, addToWishlist, removeFromWishlist, state } = useApp();
  
  const product = mockProducts.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </Pressable>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: colors.text }}>Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isInWishlist = state.wishlist.includes(product.id);

  const handleAddToCart = () => {
    console.log('Adding product to cart:', product.id);
    
    if (!selectedSize || !selectedColor) {
      Alert.alert('Selection Required', 'Please select size and color before adding to cart.');
      return;
    }

    const cartItem: CartItem = {
      id: `${product.id}-${selectedSize.id}-${selectedColor.id}-${Date.now()}`,
      productId: product.id,
      product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
      price: product.basePrice,
    };

    addToCart(cartItem);
    
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
      ]
    );
  };

  const handleCustomize = () => {
    console.log('Customizing product:', product.id);
    router.push('/(tabs)/create');
  };

  const handleWishlistToggle = () => {
    console.log('Toggling wishlist for product:', product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable onPress={handleWishlistToggle}>
            <IconSymbol 
              name={isInWishlist ? "heart.fill" : "heart"} 
              size={24} 
              color={isInWishlist ? colors.primary : colors.text} 
            />
          </Pressable>
          <Pressable onPress={() => router.push('/(tabs)/cart')}>
            <IconSymbol name="cart" size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images[currentImageIndex] }} 
            style={styles.productImage}
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>₹{product.basePrice}</Text>
          
          <View style={styles.ratingContainer}>
            <IconSymbol name="star.fill" size={16} color="#FFC107" />
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Size Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeGrid}>
            {product.sizes.map((size) => (
              <Pressable
                key={size.id}
                style={[
                  styles.sizeOption,
                  selectedSize?.id === size.id && styles.sizeOptionSelected,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize?.id === size.id && styles.sizeTextSelected,
                  ]}
                >
                  {size.name}
                </Text>
              </Pressable>
            ))}
          </View>
          {!selectedSize && (
            <Text style={styles.errorText}>Please select a size</Text>
          )}
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorGrid}>
            {product.colors.map((color) => (
              <View key={color.id} style={{ alignItems: 'center' }}>
                <Pressable
                  style={[
                    styles.colorOption,
                    { backgroundColor: color.hex },
                    selectedColor?.id === color.id && styles.colorOptionSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
                <Text style={styles.colorName}>{color.name}</Text>
              </View>
            ))}
          </View>
          {!selectedColor && (
            <Text style={styles.errorText}>Please select a color</Text>
          )}
        </View>

        {/* Fabric Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fabric Details</Text>
          <View style={styles.fabricInfo}>
            <Text style={styles.fabricText}>{product.fabric}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable
          style={[styles.button, styles.secondaryButton]}
          onPress={handleCustomize}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Customize
          </Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.primaryButton]}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
