import { TouchableOpacity, View, ScrollView, Text, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'

interface MemoryProps {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

// TODO: The action 'NAVIGATE' with payload {"name":"index"} was not handled by any navigator

dayjs.locale(ptBR)

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  const [memories, setMemories] = useState<MemoryProps[]>([])

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  })

  return (
    <ScrollView
      className="mb-4 mt-4 flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="flex-row items-center justify-between">
        <NLWLogo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View className="space-y-4" key={memory.id}>
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-200">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </Text>
            </View>
            <View className="space-y-4">
              <Image
                source={{
                  uri: memory.coverUrl,
                }}
                alt="Imagem do post"
                className="aspect-video w-full rounded-lg"
              />
              <Text className="text-justify font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>
              <Link href="/memories/id" asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">
                    Ler Mais
                  </Text>
                  <Icon name="arrow-right" size={16} color={'#9e9ea0'} />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
