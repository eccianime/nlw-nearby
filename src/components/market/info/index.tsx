import { colors } from '@/styles/colors';
import { IconProps } from '@tabler/icons-react-native';
import { ComponentType } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

type InfoProps = {
  description: string;
  icon: ComponentType<IconProps>;
};

export function Info({ icon: Icon, description }: InfoProps) {
  return (
    <View style={styles.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
