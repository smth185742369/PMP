import { useEffect, useState } from 'react';
import { getTranslation } from './translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTranslation = () => {
  const [language, setLanguage] = useState('ua');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    };
    
    loadLanguage();
  }, []);

  const t = (key) => getTranslation(language, key);

  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    await AsyncStorage.setItem('language', newLanguage);
  };

  return { t, changeLanguage, language }; // Return language too
};

export default useTranslation;
