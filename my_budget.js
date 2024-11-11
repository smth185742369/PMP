import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import useTranslation from './useTranslation';

const STORAGE_KEY = '@my_budget_items'; // Ключ для хранения в AsyncStorage

function MyBudget({ route }) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);

  // Функция для загрузки данных из AsyncStorage
  const loadItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const storedItems = jsonValue ? JSON.parse(jsonValue) : [];
      setItems(storedItems);
    } catch (e) {
      console.error("Error loading items", e);
    }
  };

  // Обработка новых пунктов при переходе
  useEffect(() => {
    loadItems(); // Загрузить пункты при монтировании компонента

    if (route.params?.newItem) {
      setItems(route.params.newItem); // Установить новые элементы, если они переданы
    }
  }, [route.params?.newItem]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name} - {item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('myBudget')}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default MyBudget;
