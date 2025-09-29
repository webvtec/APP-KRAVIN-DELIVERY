import * as React from 'react';
import { Button, Text, View, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const foodItems = [
  { id: '1', name: 'Burger', price: 5 },
  { id: '2', name: 'Pizza', price: 8 },
  { id: '3', name: 'Pasta', price: 7 },
];

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 Food Menu</Text>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - ${item.price}</Text>
            <Button
              title="Add to Cart"
              onPress={() => navigation.navigate('Cart', { item })}
            />
          </View>
        )}
      />
    </View>
  );
}

function CartScreen({ route, navigation }) {
  const { item } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart</Text>
      {item ? (
        <Text>1x {item.name} - ${item.price}</Text>
      ) : (
        <Text>Your cart is empty</Text>
      )}
      <Button
        title="Checkout"
        onPress={() => navigation.navigate('Checkout')}
      />
    </View>
  );
}

function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Order Placed!</Text>
      <Text>Thank you for ordering with Kravin Food Delivery.</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    marginBottom: 15,
  },
});
