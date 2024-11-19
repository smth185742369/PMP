import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import styles from './styles';
import useTranslation from './useTranslation';

const API_URL = 'https://my-json-server.typicode.com/smth185742369/PMP/my_budget_items'; // Убедитесь, что это правильный URL

function AddNew({ navigation }) {
  const { t } = useTranslation();
  const [itemName, setItemName] = useState(''); // Состояние для названия пункта
  const [itemAmount, setItemAmount] = useState(''); // Состояние для выделяемой суммы

  const handleAddPress = async () => {
    if (!itemName || !itemAmount) {
      Alert.alert(t('pleaseEnterBothFields'));
      return;
    }

    try {
      // Преобразуем amount в число, если это необходимо
      const newItem = { 
        name: itemName, 
        amount: parseFloat(itemAmount), // Преобразуем amount в число
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      const responseText = await response.text(); // Получаем сырой текст ответа
      console.log('Raw server response:', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText); // Попытка преобразовать в JSON
      } catch (parseError) {
        throw new Error(`Неожиданный ответ от сервера: ${responseText}`);
      }

      // Проверяем, был ли ответ успешным
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      console.log('Parsed server response:', responseData);

      // Очистка состояния
      setItemName('');
      setItemAmount('');
      
      Alert.alert(t('itemAddedSuccessfully'));
      navigation.navigate('MyBudget'); // Переход на экран бюджета
    } catch (error) {
      console.error('Ошибка при добавлении элемента:', error);
      Alert.alert(t('errorAddingItem')); // Сообщение об ошибке
    }
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
