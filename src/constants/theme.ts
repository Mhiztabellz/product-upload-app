export const COLORS = {
  primary: '#4CAF50',
  secondary: '#2196F3',
  danger: '#F44336',
  warning: '#FF9800',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#212121',
  textLight: '#757575',
  border: '#E0E0E0',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 24, fontWeight: 'bold' as const },
  h2: { fontSize: 20, fontWeight: 'bold' as const },
  body: { fontSize: 16 },
  caption: { fontSize: 14, color: COLORS.textLight },
};