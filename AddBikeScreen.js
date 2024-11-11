import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addBike } from './bikeSlice';

const AddBikeScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleAddBike = () => {
    if (name && price && image) {
      const newBike = { name, price, image };
      dispatch(addBike(newBike));
      setName('');
      setPrice('');
      setImage('');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Tên xe đạp"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Giá xe đạp"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Link hình ảnh"
        value={image}
        onChangeText={setImage}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Thêm xe đạp" onPress={handleAddBike} />
    </View>
  );
};

export default AddBikeScreen;
