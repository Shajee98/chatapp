import React from 'react'
import { KeyboardAvoidingView, ScrollView, Text, TextInput, View } from 'react-native'
import { useEffect, useLayoutEffect, useState } from 'react';
import {io} from 'socket.io-client';
import {useIsFocused} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
    const [message, setMessage] = useState('')
    const isFocused = useIsFocused();
    console.log(isFocused)
    const [chatMessages, setChatMessages] = useState([])
    var socket = io()

    useLayoutEffect(() => {
      async function connect() {
        socket = io("https://lis-chat-test.herokuapp.com")
      }
      connect();
    },[])
  
    useEffect(() => {
      async function getmessages() {
      // socket.on("1", ({message}) => {setChatMessages(currentMessages => [...currentMessages,message])})
      socket.on("1", message => {setChatMessages([...chatMessages,message])})
      if (isFocused === false) {
        setChatMessages([])
      }
    }
    getmessages();
    },[message])
  
    const submitChatMessage = () => {
      setChatMessages(currentMessages => [...currentMessages,message])
      socket.emit("2",message);
      setMessage("")
    }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
    <KeyboardAvoidingView style={{flex: 1,paddingBottom: -20}} keyboardVerticalOffset={-500}>
      <ScrollView>
    {chatMessages.map((message, key) => (
      <Text style={{color: "black",fontWeight: "500",marginLeft: 10,marginBottom: 15}} key={key}>{message}</Text>
    ))}
    </ScrollView>
    <View style={{flexDirection: "row",alignItems: "center",width: "100%",padding: 10, bottom: 0}}>
     <TextInput style={{bottom: 0,
     height: 40,
     flex: 1,
     marginRight: 15,
     backgroundColor: "#ECECEC",
     padding: 10,
     color: "grey",
     borderRadius: 30}} placeholder='Enter message' onSubmitEditing={() => submitChatMessage()} value={message} onChangeText={(text) => setMessage(text)}/>
     </View>
   </KeyboardAvoidingView>
   </SafeAreaView>
  )
}

export default ChatScreen