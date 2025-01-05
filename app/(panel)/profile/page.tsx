import { useAuth } from '@/app/context/AuthContext';
import { supabase } from '@/app/lib/supabase';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function Profile() {
    const { setAuth } = useAuth();

    async function handleSignout() {
        const { error } = await supabase.auth.signOut();
        setAuth(null);

        if(error){
            Alert.alert('Error', 'Erro ao tentar sair da conta, tente novamente mais tarde.')
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Text>Página Perfil</Text>

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
    }
})