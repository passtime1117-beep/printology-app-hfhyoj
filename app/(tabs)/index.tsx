
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
import { mockProducts, featuredProducts, trendingProducts, categories, offers } from '@/data/mockData';
import { Product, Offer } from '@/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchText: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.grey,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  categoryContainer: {
    paddingHorizontal: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  productCard: {
    width: 200,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: colors.grey,
  },
  offerCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    marginRight: 16,
    width: 280,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 12,
  },
  offerCode: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  offerCodeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Pressable
    style={styles.productCard}
    onPress={() => router.push(`/product/${product.id}`)}
  >
    <Image source={{ uri: product.images[0] }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.productPrice}>₹{product.basePrice}</Text>
      <View style={styles.productRating}>
        <IconSymbol name="star.fill" size={12} color="#FFC107" />
        <Text style={styles.ratingText}>
          {product.rating} ({product.reviewCount})
        </Text>
      </View>
    </View>
  </Pressable>
);

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => (
  <View style={styles.offerCard}>
    <Text style={styles.offerTitle}>{offer.title}</Text>
    <Text style={styles.offerDescription}>{offer.description}</Text>
    <View style={styles.offerCode}>
      <Text style={styles.offerCodeText}>Code: {offer.code}</Text>
    </View>
  </View>
);

export default function HomeScreen() {
  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  const renderOfferItem = ({ item }: { item: Offer }) => (
    <OfferCard offer={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Printologers</Text>
        <View style={styles.headerIcons}>
          <Pressable onPress={() => router.push('/notifications')}>
            <IconSymbol name="bell" size={24} color={colors.text} />
          </Pressable>
          <Pressable onPress={() => router.push('/wishlist')}>
            <IconSymbol name="heart" size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <Pressable
          style={styles.searchBar}
          onPress={() => router.push('/search')}
        >
          <IconSymbol name="magnifyingglass" size={20} color={colors.grey} />
          <Text style={styles.searchText}>Search for t-shirts...</Text>
        </Pressable>

        {/* Special Offers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
          </View>
          <FlatList
            data={offers}
            renderItem={renderOfferItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <Pressable
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => router.push(`/category/${category.id}`)}
                >
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <Pressable onPress={() => router.push('/browse')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </View>

        {/* Trending Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <Pressable onPress={() => router.push('/browse')}>
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          <FlatList
            data={trendingProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
