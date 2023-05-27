import { TouchableOpacity, View, ScrollView, Text, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

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
        <View className="space-y-4">
          <View className="flex-row items-center gap-2">
            <View className="h-px w-5 bg-gray-50" />
            <Text className="font-body text-xs text-gray-200">
              27 de Maio, 2023
            </Text>
          </View>
          <View className="space-y-4">
            <Image
              source={{
                uri: 'http://192.168.0.117:3333/uploads/dca57fed-fad2-40a2-8155-7f3686c5e98b.jpg',
              }}
              alt="Imagem do post"
              className="aspect-video w-full rounded-lg"
            />
            <Text className="text-justify font-body text-base leading-relaxed text-gray-100">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore,
              a aliquid omnis accusamus, quod voluptates esse, qui eligendi
              impedit ad ab iure mollitia vel quidem ratione sed architecto
              natus culpa...
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
      </View>
    </ScrollView>
  )
}
