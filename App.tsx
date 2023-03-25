import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Image, View, FlatList} from 'react-native';
import Header from './src/components/Header';
import { black, fondo, white } from './src/utils/colors';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIRSTAPPENTER, URLAPI } from './src/utils/names';
import { inserBank, queryBanks } from './src/database/realmDB';

const App = () => {

  const [banksList, setBanksList] = useState([]);
  const [firstEnter, setFirstEnter] = useState(false);

  useEffect(() => {
    // valit();
    consultaApi();
  }, [])


  // const valit = async () => {
  //   const firtapp = await AsyncStorage.getItem(FIRSTAPPENTER);
  //   if(firtapp == 'active'){
  //     consultaRealm();
  //     setFirstEnter(true);
  //   }else{
  //     consultaApi();
  //     setFirstEnter(false);
  //   }
  // }

  const consultaApi = async () => {
    axios.get(URLAPI)
    .then(response => {
      setBanksList(response.data);
      // AsyncStorage.setItem(FIRSTAPPENTER, 'active');
      // insert();
    })
    .catch(error => {
      console.log(error);
    });
  }

  // const consultaRealm = async () => 
  //   queryBanks().then((listBanks) => { 
  //     setBanksList(listBanks);
  //   }).catch((error) => {
  //       console.log(error);
  //   });
  // }

  // const insert = async () => {
  //   for(let i = 0; i < banksList.length; i++){
  //     const data = {
  //       id:  Date.now()+''+Date.now(),
  //       bankName: banksList[i].bankName,
  //       description: banksList[i].description,
  //       age: Number(banksList[i].age),
  //       url: banksList[i].url
  //     }
        
  //     inserBank(data).then((res) =>{
  //       console.log(res);
  //     }).catch((error) => { console.log(error) })
       
  //   }
    
  // }

  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      
        <Header />
        <View style={styles.containerList}>
          <FlatList
              // refreshControl={<RefreshControl refreshing={refreshing}  onRefresh={onRefresh}/>}
              style={styles.flatList}
              data={ banksList }
              keyExtractor={(item) => item.bankName}
              renderItem={({item, index}) => 
                <View style={styles.containerInputFlatList}>
                  <View style={styles.contentTextTitle}>
                    <Image 
                      style={styles.imgList}
                      source={{ uri: item.url }}
                    />
                    <Text style={styles.nameList}>{item.bankName}</Text>
                  </View>
                  <View>
                    <Icon name="navigate-next" color={black} size={30} />
                  </View>
                    
                    {/* <Text>{item.cadena_nombre}</Text> */}
                </View>
              }
            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 containerList: {
  backgroundColor: fondo,
  paddingHorizontal: 15
 },
 flatList: {
  marginTop: 10,
  marginBottom: 80
},
containerInputFlatList: {
  backgroundColor: white,
  marginBottom: 10,
  borderRadius: 10,
  padding: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
},
imgList: {
  width: 50,
  height: 50,
  borderRadius: 8
},
  
nameList: {
  marginLeft: 5,
  color: black,
  fontSize: 17,
  fontWeight: '600',
  textTransform: 'uppercase'
},
contentTextTitle: {
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center'
}
});

export default App;
