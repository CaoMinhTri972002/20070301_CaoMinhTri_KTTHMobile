import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBikes } from './bikeSlice';
import { useNavigation } from '@react-navigation/native';

const BikeList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bikes = useSelector((state) => state.bikes.list);
  const status = useSelector((state) => state.bikes.status);
  const error = useSelector((state) => state.bikes.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBikes());
    }
  }, [status, dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('DetailBike', { bikeId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} $</Text>
    </TouchableOpacity>
  );

  if (status === 'loading') {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (status === 'failed') {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Nút Add Bike ở trên cùng */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBike')} // Điều hướng đến AddBikeScreen
      >
        <Text style={styles.addButtonText}>Thêm xe đạp</Text>
      </TouchableOpacity>

      {/* Danh sách xe */}
      <FlatList
        data={bikes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Đảm bảo container chiếm toàn bộ màn hình
  },
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
    height: 300,
    width: 200,
  },
  image: {
    width: 150,
    height: 180,
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
    flexGrow: 1, // Làm cho FlatList chiếm hết không gian còn lại
    paddingBottom: 10, // Đảm bảo có đủ không gian dưới cho danh sách
  },
  addButton: {
    backgroundColor: 'blue', // Màu nền của nút
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10, // Khoảng cách giữa nút và các phần tử xung quanh
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BikeList;
