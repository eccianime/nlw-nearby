import { FlatList, View } from 'react-native';
import Category from '../category';
import { styles } from './styles';

export type CategoryProps = {
  id: string;
  name: string;
};

export type CategoriesProps = {
  data: CategoryProps[];
  selected: string;
  onSelect: (id: string) => void;
};

export function Categories({ data, selected, onSelect }: CategoriesProps) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      style={styles.container}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <Category
          isSelected={item.id === selected}
          iconId={item.id}
          name={item.name}
          onPress={() => onSelect(item.id)}
        />
      )}
    />
  );
}
