import { Categories, CategoryProps } from '@/components/categories';
import { PlaceProps } from '@/components/place';
import { Places } from '@/components/places';
import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

type MarketProps = PlaceProps;

export default function Home() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [category, setCategory] = useState<string>('');
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert('Catergorias', 'Não foi possivel carregar as categorias.');
    }
  };

  const fetchMarkets = async () => {
    try {
      if (!category) return;
      const { data } = await api.get(`/markets/category/${category}`);
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Locais', 'Não foi possivel carregar os locais.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1, backgroundColor: '#CCC' }}>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />
      <Places data={markets} />
    </View>
  );
}
