import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import useTranslation from './useTranslation';

const STORAGE_KEY = '@my_budget_items';

function EditBudget({ navigation }) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');

  // Загрузка данных из AsyncStorage
  const loadItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const storedItems = jsonValue ? JSON.parse(jsonValue) : [];
      setItems(storedItems);
    } catch (e) {
      console.error("Error loading items", e);
    }
  };

  // Сохранение данных в AsyncStorage
  const saveItems = async (newItems) => {
    try {
      const jsonValue = JSON.stringify(newItems);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Error saving items", e);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Функция для редактирования
  const startEditing = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemAmount(item.amount.toString());
  };

  const handleEditSave = () => {
    if (!itemName || !itemAmount) {
      Alert.alert(t('pleaseEnterBothFields'));
      return;
    }

    const updatedItems = items.map((item) =>
      item === editingItem ? { ...item, name: itemName, amount: itemAmount } : item
    );

    setItems(updatedItems);
    saveItems(updatedItems);
    setEditingItem(null);
    setItemName('');
    setItemAmount('');
  };

  // Функция для удаления
  const handleDelete = (itemToDelete) => {
    const updatedItems = items.filter((item) => item !== itemToDelete);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name} - {item.amount}</Text>
      <TouchableOpacity onPress={() => startEditing(item)}>
        <Text style={styles.editText}>{t('edit')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item)}>
        <Text style={styles.deleteText}>{t('delete')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('editBudget')}</Text>

      {editingItem && (
        <View style={styles.editContainer}>
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
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleEditSave}>
            <Text style={styles.buttonText}>{t('saveChanges')}</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default EditBudget;
