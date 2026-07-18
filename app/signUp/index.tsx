import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSignUp = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Missing fields', 'Please fill in all fields')
      return
    }
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(form))
      // navigate wherever after saving
      router.push('/LogIn')
    } catch (err) {
      console.error('Failed to save user data', err)
      Alert.alert('Error', 'Could not save your data. Please try again.')
    }
  }

  return (
    <ImageBackground
      source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgUzdXvdqypcjH2tQ9aoE6y4K7mtTBHOloihsTTVHFEQ&s=10" }}
      style={styles.storeUp}
    >
      <View style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.h1}>SignUp</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.name}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.inner}
              placeholder="XYZ"
              placeholderTextColor="#ccc"
              value={form.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          </View>

          <View style={styles.name}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inner}
              placeholder="abc@company.com"
              placeholderTextColor="#ccc"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>

          <View style={styles.name}>
            <Text style={styles.label}>password</Text>
            <TextInput
              style={styles.inner}
              placeholder="•••••••••"
              placeholderTextColor="#ccc"
              keyboardType="visible-password"
              maxLength={10}
              value={form.password}
              onChangeText={(text) => handleChange('password', text)}
            />
          </View>

          <View style={styles.auth}>
            <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
              <Text style={{ color: 'black', fontSize: 22, fontWeight: '700' }}>SignUp</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottom}>
            <Text style={styles.p}>Already have an account</Text>
            <Link href={'/LogIn'} style={styles.root}>
              <Text style={styles.root}>SignIn</Text>
            </Link>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default SignUp

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