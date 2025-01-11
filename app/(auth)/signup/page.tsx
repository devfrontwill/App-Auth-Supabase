import { useState } from 'react';
import colors from '@/constants/colors';
import { View, Text, StyleSheet, TextInput, Pressable, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { supabase } from '@/app/lib/supabase';



export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp() {
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name                    
                },            
            }
        })

        if(error){
            Alert.alert('Error', error.message);
            return;

        }else if(!error){
            Alert.alert('Success', 'Conta criada com sucesso, por favor confirme seu email !');
            setLoading(false);
            setName('');
            setEmail('');
            setPassword('');
            return;
        }
        
        setLoading(false);
        router.replace('/(auth)/signin/page');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.logoText}>
                            Dev <Text style={{ color: colors.green }}> Auth</Text>
                        </Text>
                        <Text style={styles.slogan}>
                            Criar uma conta
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Nome completo</Text>
                            <TextInput
                                placeholder='Digite seu nome...'
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                placeholder='Digite seu email...'
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                placeholder='Digite sua senha...'
                                style={styles.input}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <Pressable style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Cadastrar'}
                            </Text>
                        </Pressable>

                        <Link href="/(auth)/signin/page" style={styles.link}>
                            <Text>Já possui uma conta? Entrar </Text>
                        </Link>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.zinc,
    },
    header: {
        paddingLeft: 14,
        paddingRight: 14,
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    slogan: {
        fontSize: 34,
        color: colors.white,
        marginBottom: 34,
    },
    form: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 24,
        paddingLeft: 14,
        paddingRight: 14,
    },
    label: {
        color: colors.zinc,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14,
    },
    button: {
        backgroundColor: colors.green,
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 8,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        marginTop: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    }
})