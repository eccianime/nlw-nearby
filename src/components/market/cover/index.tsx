import { View, Text, ImageBackground } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/button';
import { IconArrowLeft } from '@tabler/icons-react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/colors';

type CoverProps = {
  uri: string;
};

export function Cover({ uri }: CoverProps) {
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button style={{ width: 40, height: 40 }} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} color={colors.gray[100]} />
        </Button>
      </View>
    </ImageBackground>
  );
}
