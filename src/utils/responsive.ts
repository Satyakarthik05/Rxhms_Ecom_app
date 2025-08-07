import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
 
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
 
// Base guideline (iPhone X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
 
// Tablet check
export const isTablet = DeviceInfo.isTablet();
 
// Clamp utility with tablet support
const clamp = (value: number, size: number): number => {
  const min = size * 0.9;
  const max = isTablet ? size * 1.4 : size * 1.2;
  return Math.min(Math.max(value, min), max);
};
 
// Core horizontal scale
export const scale = (size: number): number => {
  const scaled = (SCREEN_WIDTH / guidelineBaseWidth) * size;
  return clamp(scaled, size);
};
 
// Vertical scale (for height-based adjustments)
export const verticalScale = (size: number): number => {
  const scaled = (SCREEN_HEIGHT / guidelineBaseHeight) * size;
  return clamp(scaled, size);
};
 
// Moderate scale (balanced)
export const moderateScale = (size: number, factor = 0.5): number => {
  const scaled = scale(size);
  return size + (scaled - size) * factor;
};
 
// Font scaling
export const fontScale = (size: number): number => {
  const scaled = scale(size);
  return clamp(scaled, size);
};
 
// Alias
export const getResponsiveFont = fontScale;
 
// Reusable spacing values
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  xxl: scale(24),
  xxxl: scale(32),
};
 
// Screen dimensions
export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};