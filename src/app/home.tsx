import { Categories, CategoryProps } from '@/components/categories';
import { PlaceProps } from '@/components/place';
import { Places } from '@/components/places';
import { api } from '@/services/api';
import { colors, fontFamily } from '@/styles/theme';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

type MarketProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

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

  // const getCurrentLocation = async () => {
  //   try {
  //     const { granted } = await Location.requestForegroundPermissionsAsync();
  //     if (!granted) return;
  //     const { coords } = await Location.getCurrentPositionAsync();
  //     const { latitude, longitude } = coords;
  //     setLocation({ latitude, longitude });
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Localização', 'Não foi possivel carregar a localização.');
  //   }
  // };

  useEffect(() => {
    fetchCategories();
    // getCurrentLocation();
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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier='current'
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require('@/assets/location.png')}
        />
        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require('@/assets/pin.png')}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets} />
    </View>
  );
}
