import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import useTranslation from './useTranslation';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();
const API_URL = 'https://my-json-server.typicode.com/smth185742369/PMP/my_budget_items'; // Убедитесь, что это правильный URL для db.json

function MyBudgetWithoutProvider() {
  const { t } = useTranslation();

  // Запрос данных с помощью react-query
  const { data: items, error, isLoading } = useQuery({
    queryKey: ['budgetItems'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    refetchOnWindowFocus: true, // Обновление данных при фокусе на окно
    staleTime: 5000, // Время, через которое данные будут считаться устаревшими
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name} - {item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('myBudget')}</Text>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error fetching data</Text>}
      <FlatList
        data={items || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}  
      />
    </View>
  );
}

function MyBudget(props) {
  return (
    <QueryClientProvider client={queryClient}>
      <MyBudgetWithoutProvider {...props} />
    </QueryClientProvider>
  );
}

export default MyBudget;
