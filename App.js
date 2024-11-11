import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';
import MyBudget from "./my_budget.js";
import AddNew from "./add_new.js"; 
import EditBudget from "./edit_budget.js"; 
import Settings from "./settings.js"; 
import styles from './styles'; 
import useTranslation from './useTranslation';

const Stack = createNativeStackNavigator();

const menuItems = [
  { id: '1', title: 'myBudget', screen: 'MyBudget' },
  { id: '2', title: 'addNewItem', screen: 'AddNew' },
  { id: '3', title: 'editBudget', screen: 'EditBudget' },
  { id: '4', title: 'settings', screen: 'Settings' },
];

function Start() {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          transitionSpec: {
            open: {
              animation: 'timing', 
              config: {
                duration: 900, // изменено на 900 мс для практичности
              },
            },
            close: {
              animation: 'timing', 
              config: {
                duration: 900, // изменено на 900 мс для практичности
              },
            },
          },
          animationTypeForReplace: 'pop', 
        }}
      >
        <Stack.Screen 
          name="Menu" 
          component={Menu} 
          options={{ title: t("mainMenu") }} 
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Menu({ navigation }) {
  const { t } = useTranslation();

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
    <View style={styles.container}>
      <Text style={styles.title}>{t('mainMenu')}</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export default Start;
