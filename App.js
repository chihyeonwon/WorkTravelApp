import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { theme } from './colors';

export default function App() { 
  const [working, setWorking] = useState(true); // work일때 상태를 저장하는 useState 함수 생성
  const [text, setText] = useState(""); // 입력한 Text의 상태를 저장하는 useState 함수 생성
  const [toDos, setToDos] = useState({}); // toDos의 상태를 저장하는 useState 함수 생성
  const travel = () => setWorking(false);
  const work = () => setWorking(true);  
  const onChangeText = (payload) => setText(payload); // payload = event
  const addToDo = () => {
    if(text === "") {
      return
    }
    const newToDos = Object.assign(
      {}, // Target Object
      toDos, // 기존의 toDos
      {[Date.now()]: {text, work: working}} // 새로운 toDos
    );
    setText("");
    setToDos(newToDos);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.header}>
          <TouchableOpacity onPress={work}>
            <Text style={{ ...styles.btnText, color: working ? "white" : theme.grey }}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={travel}>
            <Text style={{ ...styles.btnText, color: !working ? "white" : theme.grey }}>Travel</Text>  
          </TouchableOpacity> 
        </View>
        <View>
          <TextInput 
            style={styles.input}
            value={text} 
            placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
            onChangeText={onChangeText} 
            onSubmitEditing={addToDo}  
            returnKeyType="done"
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  }
});
