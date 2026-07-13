// app/(tab)/cardDetails/[id].tsx
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'

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

const CAT_API_KEY = 'YOUR_CAT_API_KEY' // move to .env / expo-constants in real use

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <View style={styles.statDots}>
      {Array.from({ length: 5 }).map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i < value ? '#16a34a' : '#e5e7eb' }]}
        />
      ))}
    </View>
  </View>
)

const CatDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  const [cat, setCat] = useState<Cat | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchCat = async () => {
      try {
        const res = await axios.get<Cat>(
          `https://api.thecatapi.com/v1/images/${id}`,
          { headers: { 'x-api-key': CAT_API_KEY } }
        )
        setCat(res.data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCat()
  }, [id])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    )
  }

  if (error || !cat) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Cat not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const breed = cat.breeds?.[0]

  const stats: [string, number][] = breed
    ? [
        ['Adaptability', breed.adaptability],
        ['Affection Level', breed.affection_level],
        ['Child Friendly', breed.child_friendly],
        ['Energy Level', breed.energy_level],
        ['Grooming', breed.grooming],
        ['Intelligence', breed.intelligence],
        ['Shedding', breed.shedding_level],
        ['Social Needs', breed.social_needs],
        ['Stranger Friendly', breed.stranger_friendly],
      ]
    : []

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLink}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: cat.url }} style={styles.img} />

      <View style={styles.infoBlock}>
        <Text style={styles.title}>{breed?.name || 'Unknown Breed'}</Text>
        {breed?.origin && <Text style={styles.origin}>{breed.origin}</Text>}
        {breed?.description && <Text style={styles.desc}>{breed.description}</Text>}

        {breed?.temperament && (
          <Text style={styles.metaLine}>
            <Text style={styles.metaLabel}>Temperament: </Text>
            {breed.temperament}
          </Text>
        )}

        {breed?.life_span && (
          <Text style={styles.metaLine}>
            <Text style={styles.metaLabel}>Life span: </Text>
            {breed.life_span} years
          </Text>
        )}

        {breed?.weight?.metric && (
          <Text style={styles.metaLine}>
            <Text style={styles.metaLabel}>Weight: </Text>
            {breed.weight.metric} kg
          </Text>
        )}
      </View>

      {stats.length > 0 && (
        <View style={styles.statsGrid}>
          {stats.map(([label, value]) => (
            <StatBar key={label} label={label} value={value} />
          ))}
        </View>
      )}

      {breed?.wikipedia_url && (
        <TouchableOpacity onPress={() => Linking.openURL(breed.wikipedia_url)}>
          <Text>Read more on Wikipedia →</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}

export default CatDetail

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backLink: { color: '#16a34a', fontWeight: 'bold', marginBottom: 16 },
  errorText: { fontSize: 16, marginBottom: 12, color: '#333' },
  img: { width: '100%', height: 260, borderRadius: 16 },
  infoBlock: { marginTop: 16, gap: 6 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#16a34a' },
  origin: { fontSize: 13, color: '#6b7280' },
  desc: { fontSize: 15, color: '#374151', marginTop: 4 },
  metaLine: { fontSize: 13, color: '#374151', marginTop: 2 },
  metaLabel: { fontWeight: '600' },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
  },
  statCard: {
    width: '31%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 10,
  },
  statLabel: { fontSize: 11, fontWeight: '600', color: '#6b7280' },
  statDots: { flexDirection: 'row', gap: 3, marginTop: 6 },
  dot: { width: 16, height: 6, borderRadius: 3 },
})