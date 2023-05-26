import {
  GestureResponderEvent,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

type UsersProps = {
  title?: string
  body?: string
  userId?: number
  handleOnPress?: (event: GestureResponderEvent) => void
  handleText?: (text: string) => void
  handleBody?: (text: string) => void
}

export const AddUser = ({
  title,
  body,
  userId,
  handleOnPress,
  handleText,
  handleBody,
}: UsersProps) => {
  return (
    <View className="flex-1 items-center justify-center ">
      <View className="rounded-lg border bg-gray-600 p-8">
        <TextInput
          className="mb-6 h-10 w-80 rounded-md bg-gray-50 p-2"
          value={title}
          onChangeText={handleText}
        />
        <TextInput
          className=" mb-6 h-10 w-80  rounded-md bg-gray-50 p-2"
          value={body}
          onChangeText={handleBody}
        />
        <TouchableOpacity
          onPress={handleOnPress}
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
