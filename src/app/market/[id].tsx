import { View, Text, Alert, Modal, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { api } from '@/services/api';
import Loading from '@/components/loading';
import { Cover } from '@/components/market/cover';
import { Details, DetailsProps } from '@/components/market/details';
import { Coupon } from '@/components/market/coupon';
import { Button } from '@/components/button';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';

export default function Market() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [_, requestPermission] = useCameraPermissions();
  const [marketData, setMarketData] = useState<
    DetailsProps & { cover: string }
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isCouponFetching, setIsCouponFetching] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  const qrLock = useRef(false);

  const fetchMarket = async () => {
    try {
      const { data } = await api.get(`/markets/${id}`);
      setMarketData(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possivel carregar os dados.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  };

  const handleOpenCamera = async () => {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('Camera', 'Voce precisa habilitar o uso da camera');
      }
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert('Camera', 'Não foi possível apresentar a camera');
    }
  };

  const getCoupon = async (id: string) => {
    try {
      setIsCouponFetching(true);
      const { data } = await api.patch(`/coupons/${id}`);
      Alert.alert('Cupom', data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível utilizar o cupom');
    } finally {
      setIsCouponFetching(false);
    }
  };

  const handleUseCoupon = (id: string) => {
    setIsVisibleCameraModal(false);
    Alert.alert(
      'Cupom',
      'Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => getCoupon(id),
        },
      ]
    );
  };

  useEffect(() => {
    fetchMarket().finally(() => setIsLoading(false));
  }, [id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!marketData) {
    return <Redirect href={'/home'} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} hidden={isVisibleCameraModal} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={marketData.cover} />
        <Details {...marketData} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing='back'
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />
        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={isCouponFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
