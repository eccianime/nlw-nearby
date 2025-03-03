import { colors } from '@/styles/colors';
import { ActivityIndicator } from 'react-native';
import { styles } from './styles';

export default function Loading() {
  return (
    <ActivityIndicator color={colors.green.base} style={styles.container} />
  );
}
