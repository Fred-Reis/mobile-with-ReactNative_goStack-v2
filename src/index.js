import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar,TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';

import api from './services/api'
// import { Container } from './styles';

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data)
      setRepositories(response.data)
    })
  },[])

  const handleAdd = async () => {
    const response = await api.post('repositories',{
      title: `repositório_${Math.random().toString(36).substring(5)}`,
      url: `www.github.${Math.random().toString(36).substring(3)}.com.br`,
      techs: [
       `${Math.random().toString(36).substring(5)}`, `${Math.random().toString(36).substring(5)}`
      ]
    })

    setRepositories([...repositories, response.data])
  }

  return (
    <>
      <StatusBar barStyle='light-content'/>

      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={repositoty => repositoty.id}
          renderItem={({ item: repository }) => (
            <Text key={repository.id} style={styles.text}>{repository.title}</Text>
          )}
        />
        <TouchableOpacity 
          style={styles.btn}
          activeOpacity={0.5} 
          onPress={handleAdd}
        >
          <Text style={styles.textBtn}>Adicionar projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#7159c1'
  },
  text:{
    color: '#fff',
    fontSize: 28,
  },
  btn: {
    padding: 20,
    marginHorizontal: 30,
    marginBottom:20,
    backgroundColor: '#fff',
    borderRadius:10,
  },
  textBtn:{
    color:'#7159c1',
    fontWeight:'bold',
    fontSize: 14,
    textAlign:'center'
  }
})
