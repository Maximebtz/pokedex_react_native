import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Card } from '@/components/Card'
import { PokemonCard } from '@/components/pokemon/PokemonCard'
import { useInfiniteFetchQuery } from '@/hooks/useFetchQuery'
import { getPokemonId } from '@/functions/pokemon'
import { Row } from '@/components/Row'
import { SearchBar } from '@/components/SearchBar'
import { SortBtn } from '@/components/SortBtn'


const index = () => {
  const colors = useThemeColors()
  const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery('/pokemon?limit=21')
  const pokemons = data?.pages.flatMap(page => page.results.map(r => ({name: r.name, id: getPokemonId(r.url)}))) ?? [] // flatMap pour convertir un tableau de tableaux en un seul tableau
  const [search, setSearch] = useState('') // Tu crées un état local search pour stocker la valeur de la recherche
  const [sortKey, setSortKey] = useState<'id' | 'name'>('id') // Tu crées un état local sort pour stocker la valeur de tri
  const filteredPokemons = [...(search 
    ? pokemons.filter(
      p => 
        p.name.includes(search.toLowerCase()) ||
        p.id.toString() == search
      )
    : pokemons)].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1)) // Si search n’est pas vide, tu filtres les Pokémon en fonction de la recherche

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <Row style={styles.header} gap={12}>
        <Image source={require("@/assets/images/Logo/pokeball.png")} width={24} height={24} />
        <ThemedText variant="headline" color='grayLight'>Pokedex</ThemedText>
      </Row>
      <Row gap={16} style={styles.form}>
        <SearchBar value={search} onChange={setSearch} />
        <SortBtn value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons} // Tu passes les données de la liste des Pokémon
          numColumns={3} // Pour afficher les Pokémon en 3 colonnes
          contentContainerStyle={[styles.gridGap, styles.list]} // Pour ajouter un espacement entre les lignes
          columnWrapperStyle={styles.gridGap} // Pour ajouter un espacement entre les colonnes
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          } // Si isFetching est vrai, tu affiches un indicateur d’activité pour montrer que tu es en train de charger des données
          onEndReached={
            search ? undefined : () => fetchNextPage()
          } // Quand l’utilisateur atteint la fin de la liste, tu déclenches fetchNextPage pour charger plus de Pokémon
          renderItem={
            ({ item }) => <PokemonCard id={item.id} name={item.name} style={{ flex: 1 / 3 }} />
          } // Pour chaque Pokémon, tu affiches un composant PokemonCard avec l’ID et le nom du Pokémon
          keyExtractor={
            (item) => item.id.toString()
          } // Pour identifier chaque élément de la liste
        />
      </Card>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  body: {
    flex: 1,
    marginTop: 16
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12
  },
  form: {
    paddingHorizontal: 12,
  }
})