import { colors } from '@/styles/theme';
import { IconProps as TablerIconProps } from '@tabler/icons-react-native';
import { ComponentType } from 'react';
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { styles } from './styles';

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
};

type IconProps = TablerIconProps & {
  icon: ComponentType<TablerIconProps>;
};

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text style={styles.title}>{children}</Text>;
}

function Icon({ icon: Icon, ...rest }: IconProps) {
  return <Icon {...rest} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
