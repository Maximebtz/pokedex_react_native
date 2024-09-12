import { View, Text, StyleSheet, Image, Pressable, Modal, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors';
import { ThemedText } from './ThemedText';
import { Card } from './Card';
import { Row } from './Row';
import { Radio } from './Radio';
import { Shadows } from '@/constants/Shadows';

type Props = {
    value: "id" | "name", // Tu définis une propriété value qui peut être soit id soit name
    onChange: (s: "id" | "name") => void; // Tu définis une fonction onChange qui prend un argument s qui peut être soit id soit name
}

const options = [
    { label: "Number", value: "id" },
    { label: "Name", value: "name" },
] as const;

export function SortBtn({ value, onChange }: Props) {
    const btnRef = useRef<View>(null)
    const colors = useThemeColors()
    const [isModalVisible, setModalVisible] = useState(false)
    const [position, setPosition] = useState<null | {top: number, right: number}>(null)
    const onBtnPress = () => {
        btnRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({ 
                top: y + height, 
                right: Dimensions.get('window').width - x - width 
            })
            setModalVisible(true)
        })
        setModalVisible(true)
    }
    const onClose = () => {
        setModalVisible(false)
    }

    return (
        <>
            <Pressable onPress={onBtnPress}>
                <View 
                    ref={btnRef}
                    style={[styles.button, { backgroundColor: colors.white }]}>
                    <Image
                        source={
                            value == "id" ?
                                require("@/assets/images/Icons/tag.png")
                                : require("@/assets/images/Icons/text.png")

                        } style={styles.icon}
                    />
                </View>
            </Pressable>
            <Modal transparent visible={isModalVisible} onRequestClose={onClose} animationType='fade'>
                <Pressable style={styles.backdrop} onPress={onClose} />
                <View style={[styles.popup, { backgroundColor: colors.tint, ...position }]}>
                    <ThemedText style={styles.title} variant="subtitle2" color="white">
                        Sort by
                    </ThemedText>
                    <Card style={styles.card}>
                        {options.map ((o) => (
                            <Pressable onPress={() => onChange(o.value)}>
                                <Row key={o.value} gap={8}> 
                                    <Radio checked={o.value == value}/>
                                    <ThemedText>
                                        {o.label}
                                    </ThemedText>
                                </Row>
                            </Pressable>
                        ))}
                    </Card>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0
    },
    icon: {
        width: 24,
        height: 24,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    popup: {
        position: 'absolute',
        width: 113,
        borderRadius: 12,
        padding: 4,
        paddingTop: 16,
        gap: 16,
        ...Shadows.dp2
    },
    title: {
        paddingLeft: 16,
    },
    card: {
        padding: 16,
        borderRadius: 8,
        gap: 16
    }
})