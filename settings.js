import React from 'react';
import { View, Text, Button } from 'react-native';
import useTranslation from './useTranslation'; 
import styles from './styles'; 

function Settings() {
  const { changeLanguage, t } = useTranslation(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings')}</Text>
      
      {/* Language Change Buttons */}
      <Button title="English" onPress={() => changeLanguage('en')} />
      <Button title="Українська" onPress={() => changeLanguage('ua')} />
      <Button title="Español" onPress={() => changeLanguage('es')} />
      <Button title="Français" onPress={() => changeLanguage('fr')} />
      <Button title="Deutsch" onPress={() => changeLanguage('de')} />
    </View>
  );
}

export default Settings;
