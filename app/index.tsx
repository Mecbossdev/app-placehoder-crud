import React, { useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import { api } from '../src/lib/api'
import { useGetPostByNameQuery } from '../src/redux/services'

type Posts = {
  id?: number
  title: string
  body?: string
}

export default function PostsCards() {
  const { bottom, top } = useSafeAreaInsets()
  const [preview, setPreview] = useState<Posts[]>([])
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [onModal, setOnModal] = useState<boolean>(false)
  const { data } = useGetPostByNameQuery()

  const handleEdit = async () => {
    try {
      await api
        .post('/posts', {
          title,
          body,
          id: 1,
        })
        .then((response) => {
          setPreview([
            {
              body: response.data.body,
              title: response.data.title,
              id: response.data.id + 1,
            },
            ...preview,
          ])
        })
    } catch (err) {
      console.log(err)
    }
  }

  const Item = ({ title, body }: Posts) => (
    <View className="mt-4 border-spacing-0 rounded-xl bg-gray-600 p-4">
      <View className="flex flex-row items-end justify-end">
        <Link href="/edit" className="px-2">
          <Icon name="star" size={26} color="#0EA5E9" />
        </Link>
        <Link href="/" className="px-2">
          <Icon name="delete" size={26} color="#0EA5E9" />
        </Link>
      </View>
      <Text className="mt-4 font-title text-lg text-gray-50">{title}</Text>
      <Text className="mt-4 font-body text-base text-gray-100">{body}</Text>
    </View>
  )

  return (
    <View
      className="flex-1 p-8 text-gray-500"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="flex flex-row justify-between p-6">
        <TextInput className="mb-6 h-10 w-60 rounded-md bg-gray-50 p-2" />
        <TouchableOpacity
          onPress={() => setOnModal(true)}
          className="h-10 w-10 items-center justify-center rounded-full bg-cyan-500"
        >
          <Icon name="plus" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal visible={onModal} onDismiss={handleEdit} transparent={true}>
        <View
          className="flex-1 items-center justify-center text-gray-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <View className="rounded-lg border bg-gray-900 p-8">
            <View className="mb-6 items-start rounded-md bg-cyan-500 px-5 py-2">
              <Text className="text-base font-bold">Adicione um Novo Post</Text>
            </View>
            <TextInput
              className="mb-6 h-10 w-80 rounded-md border border-gray-500 bg-black/20 p-2 text-gray-50"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              className="mb-6 h-32 justify-center rounded-lg border border-dashed border-gray-500 bg-black/20 p-10 text-gray-50"
              value={body}
              onChangeText={(text) => setBody(text)}
            />
            <TouchableOpacity
              onPress={() => setOnModal(false)}
              className="items-center self-end rounded-full bg-cyan-500  px-5 py-2"
            >
              <Text className="text-base font-bold">Postar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.title} body={item.body} />}
        keyExtractor={(item) => item.id + ''}
      />
    </View>
  )
}
