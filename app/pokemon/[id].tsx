import { useLocalSearchParams } from "expo-router";
import {StyleSheet, View, Text } from "react-native";

export default function Pokemon() {

    const  params = useLocalSearchParams(); // hook


    return (
        <View style={styles.container}>
          <Text>Pokemon {params.id}</Text>
        </View>
      )
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })