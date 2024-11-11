import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes } from './bikeSlice';

const BikeList = () => {
  const dispatch = useDispatch();
  const bikes = useSelector((state) => state.bikes.list);
  const status = useSelector((state) => state.bikes.status);
  const error = useSelector((state) => state.bikes.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBikes());
    }
  }, [status, dispatch]);

  // Hàm render từng item xe đạp
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} $</Text>
    </View>
  );

  // Hiển thị loading spinner khi đang tải dữ liệu
  if (status === 'loading') {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  // Hiển thị lỗi nếu có lỗi xảy raS
  if (status === 'failed') {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={bikes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    fontSize: 18,
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default BikeList;
