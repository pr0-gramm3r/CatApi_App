import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter both email and password')
      return
    }

    try {
      const raw = await AsyncStorage.getItem('userData')
      const userData = raw ? JSON.parse(raw) : null

      if (!userData) {
        Alert.alert('No account found', 'Please sign up first')
        return
      }

      if (userData.email === email && userData.password === password) {
        await AsyncStorage.setItem('isLoggedIn', 'true')
        router.push('/(tab)')
      } else {
        Alert.alert('Login failed', 'Email or password is incorrect')
      }
    } catch (err) {
      console.error('Failed to read user data', err)
      Alert.alert('Error', 'Something went wrong. Please try again.')
    }
  }

  return (
    <ImageBackground
      source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgUzdXvdqypcjH2tQ9aoE6y4K7mtTBHOloihsTTVHFEQ&s=10" }}
      style={styles.storeUp}
    >
      <View style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.h1}>Login</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.name}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inner}
              placeholder="abc@company.com"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.name}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inner}
              placeholder="••••••••••"
              placeholderTextColor="#ccc"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.auth}>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              <Text style={{ color: 'black', fontSize: 22, fontWeight: '700' }}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom}>
            <Text style={styles.p}>{"Don't have an account"}</Text>
            <Link href={'/signUp'} style={styles.root}>
              <Text style={styles.root}>SignUp</Text>
            </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default LogIn

const styles = StyleSheet.create({
  storeUp: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    width: '90%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: 'white',
    borderRadius: 12,
    gap: 5,
    shadowColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  top: { height: '15%', alignItems: 'center' },
  h1: { color: 'white', fontSize: 40, fontWeight: '700' },
  main: { height: '65%', width: '80%' },
  name: { width: '100%', marginTop: 22, height: 60 },
  label: { color: 'white', fontSize: 14, marginBottom: 4 },
  inner: {
    fontSize: 18,
    borderRadius: 12,
    padding: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  auth: { width: '100%', alignItems: 'center' },
  btn: {
    borderRadius: 12,
    backgroundColor: 'lightblue',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottom: {
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  p: { color: 'white', fontSize: 16 },
  root: { fontSize: 18, fontWeight: '600', color: '#17DEFF', textDecorationLine: 'underline' },
})