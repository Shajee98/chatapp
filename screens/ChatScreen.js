import { Text, TextInput, View } from 'react-native'
import { useEffect, useLayoutEffect, useState } from 'react';
import {io} from 'socket.io-client';
import {useIsFocused} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
    const [message, setMessage] = useState('')
    const isFocused = useIsFocused();
    const [chatMessages, setChatMessages] = useState([])
    var socket = io()

    useLayoutEffect(async() => {
        socket = io("https://lis-chat-test.herokuapp.com")
        setChatMessages(JSON.parse(await AsyncStorage.getItem("chatMessages")))
    },[])
  
    useEffect(async() => {
      socket.on("1", message => {setChatMessages(...chatMessages,message)})
      await AsyncStorage.setItem("chatMessages", JSON.stringify(chatMessages))
      if (isFocused === false) {
        setChatMessages([])
      }
    },[message, isFocused])
  
    const submitChatMessage = () => {
      setChatMessages(...chatMessages,message)
      socket.emit("2",message);
      setMessage("")
    }
  return (
    <View style={{flexDirection: "row",alignItems: "flex-end",width: "100%",padding: 10, flex: 1}}>
    {chatMessages.map((message) => (
      <Text>{message}</Text>
    ))}
     <TextInput style={{bottom: 0,
     height: 40,
     flex: 1,
     marginRight: 15,
     backgroundColor: "#ECECEC",
     padding: 10,
     color: "grey",
     borderRadius: 30}} placeholder='Enter message' onSubmitEditing={() => submitChatMessage()} value={message} onChangeText={(text) => setMessage(text)}/>
   </View>
  )
}

export default ChatScreen