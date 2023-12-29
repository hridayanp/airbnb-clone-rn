import { View, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';

const Index = () => {
  const [category, setCategory] = useState('Tiny homes');

  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (data: any) => {
    // console.log(data);
    setCategory(data);
  };

  return (
    <View style={{ flex: 1, marginTop: 120 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Index;
