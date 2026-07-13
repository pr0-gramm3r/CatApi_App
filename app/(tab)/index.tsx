import { ScrollView, StyleSheet} from 'react-native'
import React from 'react'
import Card from '../card'

const Home = () => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}>
      <Card/>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  content:{
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    gap: 30,
  }
})