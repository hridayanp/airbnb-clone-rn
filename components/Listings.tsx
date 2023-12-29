import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image source={{ uri: item.medium_url }} style={styles.image} />
            <TouchableOpacity
              style={{ position: 'absolute', right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} color={Colors.dark} />
            </TouchableOpacity>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.info}>{item.name}</Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <Ionicons name="star" size={16} color={Colors.dark} />
                <Text style={styles.info}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            </View>

            <Text style={{ fontFamily: 'mon-sb' }}>{item.room_type}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: 'mon-sb' }}>$ {item.price} </Text>
              <Text style={{ fontFamily: 'mon' }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList
        data={loading ? [] : items}
        ref={listRef}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
});

export default Listings;
