import { FontAwesome5 } from '@expo/vector-icons'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CatBreed {
  adaptability: number;
  affection_level: number;
  alt_names: string;
  child_friendly: number;
  country_code: string;
  country_codes: string;
  description: string;
  dog_friendly: number;
  energy_level: number;
  experimental: number;
  grooming: number;
  hairless: number;
  health_issues: number;
  hypoallergenic: number;
  id: string;
  indoor: number;
  intelligence: number;
  life_span: string;
  name: string;
  natural: number;
  origin: string;
  rare: number;
  reference_image_id: string;
  rex: number;
  shedding_level: number;
  short_legs: number;
  social_needs: number;
  stranger_friendly: number;
  suppressed_tail: number;
  temperament: string;
  vetstreet_url: string;
  vocalisation: number;
  weight: {
    imperial: string;
    metric: string;
  };
  wikipedia_url: string;
}

interface Cat {
  breeds: CatBreed[];
  height: number;
  id: string;
  url: string;
  width: number;
}

const Card = () => {
    const router = useRouter();
    const [data, setData] = useState<Cat[] | null>(null);
    const [error, setError] = useState<unknown | null>(null);

    const handlePress = (val: Cat) => {
      router.push({ pathname: '/cardDetails/[id]', params: { id: val.id } })
    }
    useEffect(() => {
    const option: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://api.thecatapi.com/v1/images/search',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.EXPO_PUBLIC_CAT_API,
      },
      params: {
        limit: 10,
        has_breeds: true,
      }

    };

    const fetchNews = async (): Promise<void> => {
      try {

        const res = await axios.request(option);
        setData(res.data);
        console.log(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchNews();
  }, []);

  if (error) return <Text>{String(error)}</Text>


  return (
    <>
    {data?.map((val)=>{
    return (
    <View
    key = {val.id} 
    style={styles.card}>
        <View style={styles.top}>
            <Image 
            source={{ uri: val.url }}
            style={styles.img}/>
        </View>
        <View style={styles.details}>
            <Text style={styles.name}>{val.breeds?.[0]?.name || 'Unknown'}</Text>
            <Text style={styles.desc}>{val.breeds?.[0]?.description || 'Unknown'}</Text>
        </View>
        <TouchableOpacity 
        onPress={() => handlePress(val)}
        style={styles.btn}
        >
            <Text style={styles.btnText}>Visit <FontAwesome5 name="sign-in-alt" size={20} />
            </Text>
        </TouchableOpacity>
    </View>
    );
    })}
    </>
  )
}

export default Card

const styles = StyleSheet.create({
    card:{
        width: 300,
        height: 350,
        backgroundColor: '#00bfff43',
        borderRadius: 25,
    },
    top:{
        borderRadius: 15,
        height: '45%',
        width: '100%',
    },
    img:{
        flex:1,
        borderRadius: 15,
    },
    details:{
        height: '45%',
        padding: 6,
        gap: 5,
    },
    name:{
        flex: 1,
        color: '#333333',
        fontWeight: 'bold',
        fontFamily: 'arial',
        fontSize: 25,
      },
      desc:{
        flex: 3,
        color: 'grey',
        overflow: 'scroll',        
      },
      btn:{
        flex: 1,
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',        
        borderRadius: 15,
        backgroundColor: 'white'
    },
    btnText:{
      fontWeight: '600',
        fontSize: 18,
        paddingHorizontal: 6,
    }

})