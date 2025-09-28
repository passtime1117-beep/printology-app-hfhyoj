
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useApp } from '@/contexts/AppContext';
import { CartItem } from '@/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cartContent: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemVariant: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeButton: {
    padding: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantityButton: {
    padding: 8,
    minWidth: 36,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 16,
  },
  summary: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

const CartItemComponent: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateCartItem, removeFromCart } = useApp();

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    console.log('Updating quantity:', item.id, newQuantity);
    updateCartItem(item.id, newQuantity);
  };

  const handleRemove = () => {
    console.log('Removing item:', item.id);
    removeFromCart(item.id);
  };

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.images[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={styles.itemVariant}>
          {item.size.name} • {item.color.name}
        </Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
      <View style={styles.itemActions}>
        <Pressable style={styles.removeButton} onPress={handleRemove}>
          <IconSymbol name="trash" size={20} color={colors.error} />
        </Pressable>
        <View style={styles.quantityContainer}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(-1)}
          >
            <IconSymbol name="minus" size={16} color={colors.text} />
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(1)}
          >
            <IconSymbol name="plus" size={16} color={colors.text} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default function CartScreen() {
  const { state, getTotalCartAmount, getCartItemCount } = useApp();

  const subtotal = getTotalCartAmount();
  const gst = subtotal * 0.18; // 18% GST
  const delivery = subtotal > 500 ? 0 : 50; // Free delivery above ₹500
  const total = subtotal + gst + delivery;

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <CartItemComponent item={item} />
  );

  if (state.cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Shopping Cart</Text>
        </View>
        <View style={styles.emptyCart}>
          <IconSymbol
            name="cart"
            size={80}
            color={colors.grey}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some awesome t-shirts to get started!
          </Text>
          <Pressable
            style={styles.shopButton}
            onPress={() => router.push('/(tabs)/browse')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Shopping Cart ({getCartItemCount()})
        </Text>
      </View>

      <View style={styles.cartContent}>
        <FlatList
          data={state.cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </View>

      {/* Order Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST (18%)</Text>
          <Text style={styles.summaryValue}>₹{gst.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>
            {delivery === 0 ? 'FREE' : `₹${delivery}`}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
        </View>
        <Pressable
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
