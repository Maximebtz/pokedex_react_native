import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    value: "id" | "name", // Tu définis une propriété value qui peut être soit id soit name
    onChange: (s: "id" | "name") => void; // Tu définis une fonction onChange qui prend un argument s qui peut être soit id soit name
}

export function SortBtn({value, onChange}: Props) {
  return (
    <View></View>
  )
}

const styles = StyleSheet.create({})