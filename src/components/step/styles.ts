import { colors, fontFamily } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.gray[600],
  },
  description: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginTop: 4,
  },
});
