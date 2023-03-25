import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { blue, white } from '../utils/colors'

const Header = () => {
  return (
    <View style={styles.containerHeader}>
        <Text style={styles.title}>Mis bancos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    containerHeader: {
        width: '100%',
        height: 190,
        backgroundColor: blue,
        paddingTop: 35
    },
    title: {
        color: white,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 25,
        fontWeight: '700',
        textTransform: 'uppercase',
        
    }
})

export default Header