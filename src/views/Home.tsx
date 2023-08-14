import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { GlobalStyles } from '../styles/GlobalStyles';
import axios from 'axios';

const Home = ({ navigation }: any) => {
  const [accounts, setAccounts] = useState<any[]>([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://45.77.161.230:3000/cuentas',
    }).then(({ data }) => {
      setAccounts(data);
    });
  }, []);

  const showAccounts = (item: any) => {
    const { acc_name, fecha_de_cracion, id_acc_type, monto_inicial } = item;
    return (
      <View style={styles.accountContainer}>
        <Text style={styles.text}>{acc_name}</Text>
        <Text style={styles.text}>{fecha_de_cracion}</Text>
        <Text style={styles.text}>{id_acc_type}</Text>
        <Text style={styles.text}>{monto_inicial}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Accounts')}
        style={styles.button}>
        <Text style={GlobalStyles.textStyle}>Home</Text>
      </TouchableOpacity>
      <FlatList
        data={accounts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => showAccounts(item)}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    backgroundColor: 'blue',
  },
  button: {
    paddingVertical: 10,
  },
  accountContainer: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  text: { color: '#fff', margin: 10 },
});
