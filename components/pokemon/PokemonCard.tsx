import { Image, StyleSheet, View, ViewStyle } from "react-native"
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/Card';
import { useThemeColors } from "@/hooks/useThemeColors";


type Props = {
    style?: ViewStyle,
    id: number,
    name: string
}

export function PokemonCard({style, id, name}: Props) {

    const colors = useThemeColors()

    return <Card style={[style, styles.card]}>
        <ThemedText style={styles.id} variant="caption" color='grayMedium'>#{id.toString().padStart(3, '0')}</ThemedText> 
        <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} width={72} height={72}/>
        <ThemedText style={styles.name} color='grayDark'>{name}</ThemedText>
        <View style={[styles.shadow, {backgroundColor: colors.grayBackground}]}/>
    </Card>
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        alignItems: 'center',
        padding: 4,
        gap: 4,
    },
    id: {
        alignSelf: 'flex-end',
    },
    name: {
        textAlign: 'center'
    },
    shadow: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 72,
        borderRadius: 8,
        zIndex: -1,
    }

})