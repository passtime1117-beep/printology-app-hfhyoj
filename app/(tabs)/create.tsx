
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProducts, colors as productColors, fonts } from '@/data/mockData';
import { Product, Color } from '@/types';
import * as ImagePicker from 'expo-image-picker';

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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grey,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  tshirtPreview: {
    alignItems: 'center',
    marginVertical: 20,
  },
  tshirtImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  tshirtOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  designText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  designImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  fontGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fontOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  fontOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  fontText: {
    fontSize: 14,
    color: colors.text,
  },
  fontTextSelected: {
    color: '#FFFFFF',
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: colors.backgroundAlt,
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 20,
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
});

export default function CreateScreen() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(mockProducts[0]);
  const [selectedColor, setSelectedColor] = useState<Color>(productColors[0]);
  const [designText, setDesignText] = useState('');
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [textColor, setTextColor] = useState('#000000');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const pickImage = async () => {
    console.log('Picking image for design');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
      console.log('Image selected:', result.assets[0].uri);
    }
  };

  const handleSaveDesign = () => {
    console.log('Saving design');
    Alert.alert(
      'Design Saved',
      'Your custom design has been saved to your profile.',
      [{ text: 'OK' }]
    );
  };

  const handleAddToCart = () => {
    console.log('Adding custom design to cart');
    Alert.alert(
      'Added to Cart',
      'Your custom t-shirt has been added to cart.',
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Custom T-Shirt</Text>
        <Text style={styles.subtitle}>Design your perfect t-shirt</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* T-Shirt Preview */}
        <View style={styles.tshirtPreview}>
          <Image
            source={{ uri: selectedProduct.images[0] }}
            style={[styles.tshirtImage, { tintColor: selectedColor.hex }]}
          />
          <View style={styles.tshirtOverlay}>
            {uploadedImage ? (
              <Image source={{ uri: uploadedImage }} style={styles.designImage} />
            ) : designText ? (
              <Text
                style={[
                  styles.designText,
                  {
                    fontFamily: selectedFont,
                    color: textColor,
                  },
                ]}
              >
                {designText}
              </Text>
            ) : null}
          </View>
        </View>

        {/* T-Shirt Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>T-Shirt Color</Text>
          <View style={styles.colorGrid}>
            {productColors.map((color) => (
              <Pressable
                key={color.id}
                style={[
                  styles.colorOption,
                  { backgroundColor: color.hex },
                  selectedColor.id === color.id && styles.colorOptionSelected,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        {/* Design Text */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Text</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your text here..."
            placeholderTextColor={colors.grey}
            value={designText}
            onChangeText={setDesignText}
            multiline
          />
        </View>

        {/* Font Selection */}
        {designText ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Font Style</Text>
            <View style={styles.fontGrid}>
              {fonts.map((font) => (
                <Pressable
                  key={font}
                  style={[
                    styles.fontOption,
                    selectedFont === font && styles.fontOptionSelected,
                  ]}
                  onPress={() => setSelectedFont(font)}
                >
                  <Text
                    style={[
                      styles.fontText,
                      { fontFamily: font },
                      selectedFont === font && styles.fontTextSelected,
                    ]}
                  >
                    {font}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {/* Text Color Selection */}
        {designText ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Text Color</Text>
            <View style={styles.colorGrid}>
              {productColors.map((color) => (
                <Pressable
                  key={color.id}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color.hex },
                    textColor === color.hex && styles.colorOptionSelected,
                  ]}
                  onPress={() => setTextColor(color.hex)}
                />
              ))}
            </View>
          </View>
        ) : null}

        {/* Upload Image */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Design</Text>
          <Pressable style={styles.uploadButton} onPress={pickImage}>
            <IconSymbol name="photo" size={24} color={colors.primary} />
            <Text style={styles.uploadText}>
              {uploadedImage ? 'Change Image' : 'Upload Image'}
            </Text>
          </Pressable>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={handleSaveDesign}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Save Design
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
