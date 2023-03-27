import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Image, View, FlatList, Modal,Pressable} from 'react-native';
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
        <View style={[styles.containerList, styles.sombreado]}>
          <FlatList
              // refreshControl={<RefreshControl refreshing={refreshing}  onRefresh={onRefresh}/>}
              style={styles.flatList}
              data={ banksList }
              keyExtractor={(item) => item.bankName}
              renderItem={({item, index}) => 
                <Pressable 
                  style={styles.containerInputFlatList}
                  onPress={() => consultModal(item)}
                >
                  <View style={styles.contentTextTitle}>
                    <Image 
                      style={styles.imgList}
                      source={{ uri: item.url }}
                    />
                    <Text style={styles.nameList}>{item.bankName}</Text>
                  </View>
                  <View>
                    <Text style={styles.btnLeft}> > </Text>
                    {/* <Icon name="navigate-next" color={black} size={30} /> */}
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
                <Text style={styles.txtHeaderModal}>{name}</Text>
                <Pressable
                  onPress={() => setModalVisible(false)}
                > 
                  <Text style={styles.btnSalir}>X</Text>
                  {/* <Icon name="close" color={black} size={25} />  */}
                </Pressable>
              </View>

              <View style={styles.infoModal}>
                <Image 
                  style={styles.imageModal}
                  source={{ uri: url }}
                />
                <Text style={styles.txtDescription}>{description}</Text>
                <Text style={styles.txtAge}>Con mas de {age} años en el mercado</Text>
              </View>

          </View>
        </Modal>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 containerList: {
  backgroundColor: fondo,
  paddingHorizontal: 15,
  height: '100%',
  marginTop: -30,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
  paddingTop: 15
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
  },
  sombreado: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  modalContent: {
    marginTop: 43,
    paddingLeft: 15,
    paddingRight: 15
  },
  modalHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  txtHeaderModal:{
    fontSize: 18,
    fontWeight: 'bold',
    color: black,
    textTransform: 'uppercase'
  },
  imageModal: {
    width: 150,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center'
  },
  infoModal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtDescription:{
    fontSize: 18,
    fontWeight: '600',
    color: black,
    marginTop: 12
  },
  txtAge: {
    marginTop: 5,
    fontSize: 15
  },
  btnSalir: {
    fontSize: 22,
    color: black
  },
  btnLeft: {
    color: black,
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default App;
