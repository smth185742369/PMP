// styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f0f1f',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#1b1b2f', 
    borderRadius: 50,
    marginVertical: 10,
    shadowColor: '#00e0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 20,
    borderWidth: 1,
    borderColor: '#ff007f', 
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1.5,
    fontWeight: 'bold',
    textShadowColor: '#ff007f',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
    textShadowColor: '#00e0ff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  item: {
    padding: 20,
    backgroundColor: '#1b1b2f',
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#00e0ff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#ff007f',
  },
  itemText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textShadowColor: '#ff007f',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#1b1b2f', 
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#ffffff',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#00e0ff',
    shadowColor: '#00e0ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default styles;