import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../../assets/logo.png';

export default function Login({ navigation }) {

    const [ user, setUser ] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(
            user => {
                if(user) navigation.navigate('Main', { user } );
            }
        )
    }, []);

    async function handleLogin() {
        
        
        let { data: { _id } } = await api.post('/devs', { username: user });

        await AsyncStorage.setItem('user', _id);
        
        navigation.navigate('Main', { user: _id } );

    }


    return (
        <View style={styles.container}>

            <Image source={logo} />

            <TextInput 
                onChangeText={setUser}
                value={user}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="#999"
                placeholder="Digite seu usuário no Github" 
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button} >
                <Text style={styles.buttonText} >
                    Enviar
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#f5f5f5',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 30

        },

        input: {
            height: 46,
            alignSelf: 'stretch',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 4,
            paddingHorizontal: 15,
            marginTop: 15

        },

        button: {
            height: 46,
            alignSelf: 'stretch',
            backgroundColor: '#df4723',
            borderRadius: 4,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',

        },

        buttonText: {
            color:  '#fff',
            fontWeight: 'bold',
            fontSize: 16,

        }
    }
)