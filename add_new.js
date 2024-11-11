import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import styles from './styles';
import useTranslation from './useTranslation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@my_budget_items'; // Ключ для хранения в AsyncStorage

function AddNew({ navigation }) {
  const { t } = useTranslation();
  const [itemName, setItemName] = useState(''); // Состояние для названия пункта
  const [itemAmount, setItemAmount] = useState(''); // Состояние для выделяемой суммы

  const handleAddPress = async () => {
    if (!itemName || !itemAmount) {
      Alert.alert(t('pleaseEnterBothFields')); // Сообщение об ошибке
      return;
    }

    // Загружаем существующие пункты из AsyncStorage
    const existingItems = await AsyncStorage.getItem(STORAGE_KEY);
    const itemsArray = existingItems ? JSON.parse(existingItems) : [];

    // Добавление нового пункта
    const newItem = { name: itemName, amount: itemAmount };
    const updatedItems = [...itemsArray, newItem];

    // Сохраняем обновленный список в AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));

    // Сброс полей ввода
    setItemName('');
    setItemAmount('');

    // Навигация к экрану MyBudget с обновленным списком
    navigation.navigate('MyBudget', {
      newItem: updatedItems,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('addNewItem')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('itemName')}
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder={t('itemAmount')}
        value={itemAmount}
        onChangeText={setItemAmount}
        keyboardType="numeric" // Только для числового ввода
      />

      <TouchableOpacity style={styles.button} onPress={handleAddPress}>
        <Text style={styles.buttonText}>{t('add')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddNew;
