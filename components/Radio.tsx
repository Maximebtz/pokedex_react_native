import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
    checked: boolean;
}

export function Radio({checked}: Props) {
    const colors = useThemeColors()
  return (
    <View style={[styles.radio, {borderColor: colors.tint}]}>
        {checked && <View style={[styles.radioInner, {backgroundColor: colors.tint}]}/>}
    </View>
  )
}

const styles = StyleSheet.create({
    radio:{
        borderRadius: 14,
        width: 14,
        height: 14,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner:{
        borderRadius: 8,
        width: 6,
        height: 6,
    }
})