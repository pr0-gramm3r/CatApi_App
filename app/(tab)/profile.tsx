import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Profile = () => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../asset/profile.jpg')}
        style={styles.img}
        accessibilityLabel="Profile"
      />
      <View style={styles.details}>
        <Text style={styles.name}>Kumar Ayush</Text>
        <Text style={styles.desc}>
          {"I want to achieve my goals and be happy, not because happiness is a finish line, but because it's the quiet fuel that keeps me moving forward. I've learned that progress rarely feels dramatic — it's steady effort, small wins, and showing up even on days when motivation fades. I want to build things that matter, learn continuously, and stay curious rather than complacent. I want relationships that ground me and work that challenges me without consuming me. Success, to me, isn't just achievement — it's balance: growth without burnout, ambition without losing sight of gratitude. If I can look back and feel proud of both the journey and who I became, that's enough."}
        </Text>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  card:{
    flex:1,
    margin: 10,
    alignItems: 'center'
  },
  img:{
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  details:{
    height: '80%',
    marginLeft: 10,
    alignItems: 'center',
  },
  name:{
    flex: 1,
    fontSize: 30,
    marginTop: 10,
    color: '#00B2FF',

  },
  desc:{
    flex: 9,
    fontSize: 20,
    color: 'gray',
    width: 350,
    textAlign: 'center',
    marginTop: 15,
    overflow: 'scroll',
  }
})