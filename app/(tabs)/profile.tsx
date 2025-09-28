
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { useApp } from '@/contexts/AppContext';

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
  profileSection: {
    backgroundColor: colors.card,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.grey,
  },
  loginPrompt: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    elevation: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  menuBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  menuBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: colors.error,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

interface MenuItemProps {
  icon: string;
  title: string;
  badge?: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, badge, onPress }) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <IconSymbol name={icon as any} size={24} color={colors.text} style={styles.menuIcon} />
    <Text style={styles.menuText}>{title}</Text>
    {badge && (
      <View style={styles.menuBadge}>
        <Text style={styles.menuBadgeText}>{badge}</Text>
      </View>
    )}
    <IconSymbol name="chevron.right" size={16} color={colors.grey} />
  </Pressable>
);

export default function ProfileScreen() {
  const { state } = useApp();

  const handleLogin = () => {
    console.log('Navigating to login');
    router.push('/auth/login');
  };

  const handleLogout = () => {
    console.log('Logging out user');
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {
          // Handle logout logic here
          console.log('User logged out');
        }},
      ]
    );
  };

  const menuItems = [
    {
      icon: 'bag',
      title: 'My Orders',
      badge: state.orders.length > 0 ? state.orders.length.toString() : undefined,
      onPress: () => router.push('/orders'),
    },
    {
      icon: 'heart',
      title: 'Wishlist',
      badge: state.wishlist.length > 0 ? state.wishlist.length.toString() : undefined,
      onPress: () => router.push('/wishlist'),
    },
    {
      icon: 'location',
      title: 'Addresses',
      onPress: () => router.push('/addresses'),
    },
    {
      icon: 'creditcard',
      title: 'Payment Methods',
      onPress: () => router.push('/payment-methods'),
    },
    {
      icon: 'star',
      title: 'Loyalty Points',
      badge: '250',
      onPress: () => router.push('/loyalty'),
    },
    {
      icon: 'questionmark.circle',
      title: 'Help & Support',
      onPress: () => router.push('/support'),
    },
    {
      icon: 'gear',
      title: 'Settings',
      onPress: () => router.push('/settings'),
    },
    {
      icon: 'info.circle',
      title: 'About Printologers',
      onPress: () => router.push('/about'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {state.isAuthenticated && state.user ? (
            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {state.user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.userName}>{state.user.name}</Text>
              <Text style={styles.userEmail}>{state.user.email}</Text>
            </View>
          ) : (
            <View style={styles.loginPrompt}>
              <Text style={styles.loginTitle}>Welcome to Printologers!</Text>
              <Text style={styles.loginSubtitle}>
                Login to access your orders, wishlist, and personalized experience
              </Text>
              <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login / Sign Up</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
              onPress={item.onPress}
            />
          ))}
        </View>

        {/* Logout Button */}
        {state.isAuthenticated && (
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
