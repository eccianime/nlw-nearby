import { Text, View } from 'react-native';
import { styles } from './styles';
import { Info } from '../info';
import { IconMapPin, IconPhone, IconTicket } from '@tabler/icons-react-native';

export type DetailsProps = {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
};

export function Details({
  name,
  description,
  address,
  phone,
  coupons,
  rules,
}: DetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>
        <Info
          icon={IconTicket}
          description={`${coupons} cupons disponíiveis`}
        />
        <Info icon={IconMapPin} description={address} />
        <Info icon={IconPhone} description={phone} />
      </View>
      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>
        {rules.map((rule) => (
          <Text key={rule.id} style={styles.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
