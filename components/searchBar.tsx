import { Image, StyleSheet, TextInput, View } from "react-native";
import { Row } from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    value: string; // Tu définis une propriété value qui peut être une chaîne de caractères
    onChange: (s: string) => void; // Tu définis une fonction onChange qui prend un argument s qui est une chaîne de caractères
}

export function SearchBar({value, onChange}: Props) {
 const colors = useThemeColors()
    return (
    <Row style={[styles.wrapper, {backgroundColor: colors.white}]}>
        <Image 
            source={require("@/assets/images/Icons/search.png")} 
            style={styles.image}
        />
        <TextInput style={styles.input} onChangeText={onChange} value={value} /> 
    </Row>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 12,
    },
    image: {
        width: 16,
        height: 16,
    },
    input: {
        flex: 1,
        height:16,
        fontSize: 10,
        lineHeight: 16,
    }
})