import React from 'react';
import { View, Text, Image, StyleSheet,Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const DetailBike = () => {
  const route = useRoute();
  const { bikeId } = route.params;
  const bike = useSelector((state) =>
    state.bikes.list.find((item) => item.id === bikeId)
  );

  if (!bike) {
    return <Text style={styles.error}>Bike not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: bike.image }} style={styles.image} />
      <Text style={styles.name}>{bike.name}</Text>
      <Text style={styles.price}>{bike.price} $</Text>
      <Text style={styles.description}>{bike.description}</Text>
      <View>
       <Pressable style={{borderRadius:10, borderWidth:1, backgroundColor:"red", height:50, width:200, justifyContent:'center', alignItems:'center'}}><Text style={{color:'white'}}>Add to card</Text></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#888',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});

export default DetailBike;
