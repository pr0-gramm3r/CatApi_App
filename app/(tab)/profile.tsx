import React from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

const Profile = () => {


const handleLogout = async () => {
  try {
    await AsyncStorage.setItem('isLoggedIn', 'false')
    router.replace('/LogIn')
  } catch (err) {
    console.error('Failed to logout', err)
    Alert.alert('Error', 'Something went wrong while logging out. Please try again.')
  }
}

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

      <TouchableOpacity style={styles.logout} activeOpacity={0.8}>
        <Text
        onPress={handleLogout} 
        style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
    backgroundColor: 'white',
    color: '#00B2FF',
    paddingHorizontal: 20,
    paddingTop: 7,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  desc:{
    flex: 9,
    fontSize: 20,
    color: 'gray',
    width: 350,
    textAlign: 'center',
    marginTop: 15,
    overflow: 'scroll',
  },
  logout: {
  backgroundColor: '#00B2FF',
  paddingVertical: 12,
  paddingHorizontal: 40,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#0000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 6,
  elevation: 5, 
},
logoutText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
  letterSpacing: 0.5,
},
})