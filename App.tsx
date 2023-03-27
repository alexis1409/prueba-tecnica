import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, Image, View, FlatList, Modal,Pressable} from 'react-native';
import Header from './src/components/Header';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIRSTAPPENTER, URLAPI } from './src/utils/names';
import { inserBank, queryBanks } from './src/database/realmDB';
import { stylesApp } from './src/styles/stilos';
import { black } from './src/utils/colors';

const App = () => {

  const [banksList, setBanksList] = useState([]);
  const [firstEnter, setFirstEnter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    valit();
  }, [])


  const valit = async () => {
    const firtapp = await AsyncStorage.getItem(FIRSTAPPENTER);
    if(firtapp == 'active'){
      consultaRealm();
      setFirstEnter(true);
    }else{
      consultaApi();
      setFirstEnter(false);
    }
  }

  const consultaApi = async () => {
    axios.get(URLAPI)
    .then(response => {
      setBanksList(response.data);
      AsyncStorage.setItem(FIRSTAPPENTER, 'active');
      insert(response.data);
      
    })
    .catch(error => {
      console.log(error);
    });
  }

  const consultaRealm = async () => {
    queryBanks().then((listBanks) => { 
      setBanksList(listBanks);
    }).catch((error) => {
        console.log(error);
    });
  }

  const insert = (datos) => {
    console.log(datos.length);
    
    for(let i = 0; i < datos.length; i++){
      const data = {
        id:  Number(Date.now()+''+i),
        bankName: datos[i].bankName,
        description: datos[i].description,
        age: Number(datos[i].age),
        url: datos[i].url
      }
        
      inserBank(data).then((res) =>{
        console.log(res);
      }).catch((error) => { console.log(error) }) 
    }
  }

  const consultModal = (banco) => {
    
    setName(banco.bankName)
    setAge(banco.age)
    setDescription(banco.description)
    setUrl(banco.url)
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      
        <Header />
        <View style={[stylesApp.containerList, stylesApp.sombreado]}>
          <FlatList
              style={stylesApp.flatList}
              data={ banksList }
              keyExtractor={(item) => item.bankName}
              renderItem={({item, index}) => 
                <Pressable 
                  style={stylesApp.containerInputFlatList}
                  onPress={() => consultModal(item)}
                >
                  <View style={stylesApp.contentTextTitle}>
                    <Image 
                      style={stylesApp.imgList}
                      source={{ uri: item.url }}
                    />
                    <Text style={stylesApp.nameList}>{item.bankName}</Text>
                  </View>
                  <View>
                    <Icon name="navigate-next" color={black} size={30} />
                  </View>
                </Pressable>
              }
            />
        </View>

        <Modal
          animationType='fade'
          visible={modalVisible}
          statusBarTranslucent={true}
        >
          <View style={stylesApp.modalContent}>
            <View style={stylesApp.modalHeader}>
                <Text style={stylesApp.txtHeaderModal}>{name}</Text>
                <Pressable
                  onPress={() => setModalVisible(false)}
                > 
                  <Icon name="close" color={black} size={25} /> 
                </Pressable>
              </View>

              <View style={stylesApp.infoModal}>
                <Image 
                  style={stylesApp.imageModal}
                  source={{ uri: url }}
                />
                <Text style={stylesApp.txtDescription}>{description}</Text>
                <Text style={stylesApp.txtAge}>Con mas de {age} años en el mercado</Text>
              </View>

          </View>
        </Modal>
        
    </SafeAreaView>
  );
}

export default App;
