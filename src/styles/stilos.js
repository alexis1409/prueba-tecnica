import { StyleSheet} from 'react-native';
import {  black, fondo, white } from '../utils/colors';

export const stylesApp = StyleSheet.create({
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