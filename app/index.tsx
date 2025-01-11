import colors from '@/.constants/colors';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={44} color={colors.green} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: colors.zinc,
        justifyContent: 'center',
        alignItems: 'center',
    },
})