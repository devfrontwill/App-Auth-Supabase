import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/app/lib/supabase';
import colors from '@/constants/colors';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function Profile() {
    const { setAuth, user } = useAuth();

    async function handleSignout() {
        const { error } = await supabase.auth.signOut();
        setAuth(null);

        if(error){
            Alert.alert('Error', 'Erro ao tentar sair da conta, tente novamente mais tarde.')
            return;

        }else if(!error){
            Alert.alert('Success', 'Usuário deslogado com sucesso !');
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Página Perfil</Text>
            <Text style={styles.text}>Bem vindo {user?.email}</Text>

            <Button                
                title='Sair'
                onPress={handleSignout}                
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.zinc,        
    },
    text: {
        marginBottom: 16,
        color: colors.white,
    }
})