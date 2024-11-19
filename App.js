import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, TouchableOpacity, Text, View, Switch, StyleSheet } from 'react-native';
import MyBudget from "./my_budget.js";
import AddNew from "./add_new.js"; 
import EditBudget from "./edit_budget.js"; 
import Settings from "./settings.js"; 
import Registration from "./registration.js"; // Новый экран регистрации
import styles from './styles'; 
import useTranslation from './useTranslation';
import { SQLiteProvider } from 'expo-sqlite'; 
import * as SQLite from 'expo-sqlite';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Создаем новый экземпляр QueryClient для React Query
const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase('users.db');
const menuItems = [
  { id: '1', title: 'myBudget', screen: 'MyBudget' },
  { id: '2', title: 'addNewItem', screen: 'AddNew' },
  { id: '3', title: 'editBudget', screen: 'EditBudget' },
  { id: '4', title: 'settings', screen: 'Settings' },
];

function Start() {
  const { t } = useTranslation();
  return (
    // Оборачиваем приложение в SQLiteProvider и QueryClientProvider
    <SQLiteProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{
              transitionSpec: {
                open: { animation: 'timing', config: { duration: 900 } },
                close: { animation: 'timing', config: { duration: 900 } },
              },
              animationTypeForReplace: 'pop', 
            }}
          >
            <Stack.Screen 
              name="Menu" 
              component={Menu} 
              options={({ navigation }) => ({
                title: t("mainMenu"),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Registration")}
                    style={localStyles.iconButton}
                  >
                    <Text style={localStyles.iconText}>👤</Text>
                  </TouchableOpacity>
                ),
              })} 
            />
            <Stack.Screen 
              name="MyBudget" 
              component={MyBudget} 
              options={{ title: t("myBudget") }} 
            />
            <Stack.Screen 
              name="AddNew" 
              component={AddNew} 
              options={{ title: t("addNewItem") }} 
            />
            <Stack.Screen 
              name="EditBudget" 
              component={EditBudget} 
              options={{ title: t("editBudget") }} 
            />
            <Stack.Screen 
              name="Settings" 
              component={Settings} 
              options={{ title: t("settings") }} 
            />
            <Stack.Screen 
              name="Registration" 
              component={Registration} 
              options={{ title: t("registration") }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SQLiteProvider>
  );
}

function Menu({ navigation }) {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log(`Navigating to ${item.screen}`);
        navigation.navigate(item.screen);
      }}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{t(item.title)}</Text>
    </TouchableOpacity>
  );    

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={styles.title}>{t('mainMenu')}</Text>
      
      {/* Switch для переключения темы */}
      <View style={styles.switchContainer}>
        <Text>{isDarkMode ? t("Dark Mode") : t("Light Mode")}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  iconButton: {
    marginRight: 10,
  },
  iconText: {
    fontSize: 24, // Размер значка
  },
});

export default Start;
