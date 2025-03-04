import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
} from 'react-native';
import { styles } from './styles';
import { IconTicket } from '@tabler/icons-react-native';
import { colors } from '@/styles/colors';

export type PlaceProps = {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
};

export function Place({
  data,
  ...rest
}: { data: PlaceProps } & TouchableOpacityProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image style={styles.image} source={{ uri: data.cover }} />
      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {data.description}
        </Text>
        <View style={styles.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={styles.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
