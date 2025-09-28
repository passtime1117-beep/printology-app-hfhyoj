
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.grey,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: colors.grey,
  },
  socialButtons: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  socialButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  guestButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  guestButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '500',
  },
});

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log('Form submitted:', { isLogin, email, password, name, phone });
    
    if (isLogin) {
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      // Handle login
      Alert.alert('Success', 'Login successful!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      if (!name || !email || !phone || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      // Handle signup
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Social login with:', provider);
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
  };

  const handleGuestContinue = () => {
    console.log('Continue as guest');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>Printologers</Text>
          <Text style={styles.tagline}>Your Custom T-Shirt Destination</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Login/Signup Tabs */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, isLogin && styles.activeTab]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.tabText, isLogin && styles.activeTabText]}>
                Login
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, !isLogin && styles.activeTab]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>
                Sign Up
              </Text>
            </Pressable>
          </View>

          {/* Form Fields */}
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'name' && styles.inputFocused,
                ]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.grey}
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'email' && styles.inputFocused,
              ]}
              placeholder="Enter your email"
              placeholderTextColor={colors.grey}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {!isLogin && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'phone' && styles.inputFocused,
                ]}
                placeholder="Enter your phone number"
                placeholderTextColor={colors.grey}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                onFocus={() => setFocusedInput('phone')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'password' && styles.inputFocused,
              ]}
              placeholder="Enter your password"
              placeholderTextColor={colors.grey}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {isLogin && (
            <Pressable style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
          )}

          {/* Submit Button */}
          <Pressable style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>
              {isLogin ? 'Login' : 'Create Account'}
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <IconSymbol name="globe" size={20} color={colors.text} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </Pressable>

            <Pressable
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              <IconSymbol name="applelogo" size={20} color={colors.text} />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </Pressable>
          </View>

          {/* Guest Continue */}
          <Pressable style={styles.guestButton} onPress={handleGuestContinue}>
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </Pressable>
        </View>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
