# Build Work Travel App by using react-native (리액트 네이티브를 사용해서 할 일과 여행 목록 앱 개발)

## 프로젝트 생성

다음 명령을 터미널에서 실행하여 WorkTravelApp Exop 프로젝트를 생성한다.
```javascript
cd Documents
expo init WorkTravelApp --npm

blank checked
```

## Header 영역 생성

Header 영역에는 Work, Travel 두 개의 버튼을 생성한다.

```javascript
<View style={styles.header}>
          <Text style={styles.btnText}>Work</Text>
          <Text style={styles.btnText}>Travel</Text>
</View>
```

컨테이너영역, 헤더영역, 버튼의 스타일은 다음과 같이 설정한다.
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    color: 'white',
  }
});
```

테마 배경색을 지정해주는 theme을 export하는 colors.js 파일을 생성한다.

```javascript
export const theme = {
    background:'black',
    grey: '#3A3D40',
};
```

App.js에서 theme을 import 한다.
```javascript
import { theme } from './colors';
```

colors.js 파일의 theme을 사용해 배경색을 바꿔준다.
```javascript
container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
```
Work, Travel Text를 onPress 했을 때 효과를 주는 TouchableOpacity를 import 하고 work, travel을 TouchableOpacity로 감싸준다.
```javascript
import {TouchableOpacity} from 'react-native';

<TouchableOpacity>
            <Text style={styles.btnText}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.btnText}>Travel</Text>  
</TouchableOpacity>
```

work일때와 travel일 때 상태를 저장하는 state 생성한다.
```javascript
const [working, setWorking] = useState(true); // work일때 상태를 저장하는 useState 함수 생성
  const travel = () => setWorking(false);
  const work = () => setWorking(true);  
```

TouchableOpacity의 onPress(터치했을때 { }안의 함수를 실행시켜주는 속성)에 work 함수와 travel 함수를 넣어준다.
```javascript
<TouchableOpacity onPress={work}>
            <Text style={styles.btnText}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={travel}>
            <Text style={styles.btnText}>Travel</Text>  
</TouchableOpacity>
```

work와 Travel 둘 중에 선택하는 Text에 따라 work와 travel함수를 실행시켜서 바뀐 working 상태(true or false)에 따라서 폰트 색깔을 변경한다.
```javascript
<TouchableOpacity onPress={work}>
            <Text style={{ ...styles.btnText, color: working ? "white" : theme.grey }}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={travel}>
            <Text style={{ ...styles.btnText, color: !working ? "white" : theme.grey }}>Travel</Text>  
</TouchableOpacity>
```

## 텍스트 입력창 생성하기

텍스트 입력을 지원하는 TextInput을 react-native에서 import한다.
```javascript
import {TextInput} from 'react-native';
```

TextInput의 배경색을 흰색으로 변경한다.
```javascript
<TextInput style={styles.input} />

input: {
          backgroundColor: 'white',
}
```

TextInput의 속성 중 placeholder를 사용하여 working일때는 'Add a To do' 문구를 working이 아닐 때는 'Where do you want to go' 문구를 넣는다.
```javascript
          <TextInput style={styles.input} placeholder={working ? 'Add a To Do' : 'Where do you want to go?'} />
```

TextInput의 paddingVertical, paddingHorizontal, borderRadius marginTop, fontSize를 지정하여 꾸며준다.
```javascript
 input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  }
```
TextInput에 입력한 Text를 저장하는 state 배열을 생성한다.
```javascript
 const [text, setText] = useState(""); // 입력한 Text를 저장하는 state 함수 생성
 ```
TextInput에 입력한 Text의 상태를 setText의 payload로 저장하는 onChangeText 함수를 생성한다.
```javascript
const onChangeText = (payload) => setText(payload); // payload = event
```
TextInput의 onChangeText 속성을 사용해 TextInput의 텍스트가 변경되었을 때 onChangeText 함수가 실행되도록 하고 입력한 Text값을 value로 저장한다.
```javascript
<TextInput 
            style={styles.input}
            value={text} 
            placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
            onChangeText={onChangeText}  
/>      
```

TextInput의 onSubmitEditing 속성을 사용하여 텍스트를 입력하고 확인을 눌렀을 때 addToDo 함수가 발생하도록 설정한다.
```javascript
<TextInput onSubmitEditing={addToDo} />
```

TextInput의 returnKeyType 속성을 사용하여 키보드의 확인기능을 done으로 수정한다.
```javascript
<TextInput returnKeyType="done" />
```
함수 addToDo를 text가 비어있으면 그냥 return 하고 text가 들어있으면 저장하는 함수로 변경한다.
```javascript
const addToDo = () => {
    if(text === "") {
      return
    }
    // save to do
    setText("");
  }
```

입력하는 텍스트들(toDos)을 저장하고 상태를 관리하는 useState 함수를 Object로 생성한다.
```javascript
const [toDos, setTodos] = useState({});
```

state의 수정없이 Object를 결합하는 Object.assign을 사용하여 이전의 todo와 새로운 todo를 결합해서 결과값을 newTodos 변수에 저장한다.
```javascript
const newTodos = Object.assign({}, toDos, {[Date.now()]: {text, work: working}};
```

세 객체를 결합한 newToDos를 setToDos의 매개변수로 넣는다.
```javascript
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
```

또 다른 방법으로 ES6에서 지원하는 ...toDos를 사용하여 이전 Object를 가지는 새로운 Object를 만들고 새로운 toDo도 추가하는 방법이 있다.
```javascript
const newToDos = { ...toDos, [Date.now()]: {text, work: working} };
```

## 입력한 텍스트(toDo)를 화면에 표시하기

스크롤해서 사용자가 많은 todo를 화면에 추가할 수 있도록 하는 ScrollView를 import한다.
```javascript
import { ScrollView } from 'react-native';
```
Object의 keys와 map 함수를 사용해서 사용자의 텍스트(toDos)를 화면에 표시한다.
```javascript
<ScrollView>
          {Object.keys(toDos).map(key => 
                    <View style={styles.toDo} key={key}>
                              <Text style={styles.toDoText}
                                        {toDos[key].text}
                              </Text>
                    </View>
          )}
 </ScrollView>
 ```
 
 toDo와 toDoText 에 다음 스타일을 적용한다.
 ```javascript
 toDo: {
    backgroundColor: theme.toDoBackground, // color.js 파일에 theme.toDoBackground: "#5C5C60"을 추가한다.
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight:"500",
  }
```

## Work와 Travel의 toDo 나누기

newToDo의 work:working을 working으로 수정한다.
```javascript
const newToDos = { ...toDos, [Date.now()]: {text, working} };
```

삼항연산자를 사용해서 현재 toDo의 working이 지금 존재하는 working인지 확인하고 working에 따라 다른 화면을 보여주도록 구현한다.
```javascript
<ScrollView>
            {Object.keys(toDos).map(key =>
              toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>
                  {toDos[key].text}
                </Text>
              </View>
              ) : null
            )}
</ScrollView>
```

## expo가 제공하는 AsyncStorage 모듈을 사용하여 사용자가 입력한 ToDo를 다른페이지로 이동하여도 없어지지 않도록 저장하기

다음 코드를 터미널에서 실행하여 expo AsyncStorage를 설치한다.
```javascript
expo install @react-native-async-storage/async-storage
```
그 후 설치한 AsyncStorage를 import 해준다.
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
```
현재 있는 ToDos를 string으로 바꾸고 setItem을 사용해서 브라우저의 로컬저장소처럼 저장하는 saveToDos 함수를 생성한다.
```javascript
const saveToDos = async (toSave) => {
    await AsyncStorage.setItem("@toDos", JSON.stringify(toSave));
};
```

saveToDos 함수에 newToDos를 비동기적으로 전달하기 위해 await를 사용한다.
```javascript
await saveToDos(newToDos);
```

addToDo 안에 await를 사용한 함수가 있기 때문에 addToDo에 async 키워드를 사용한다.
```javascript
const addToDo = async () => {
    if(text === "") {
      return
    }
    const newToDos = { ...toDos, [Date.now()]: {text, working} };
    setText("");
    await saveToDos(newToDos);
    setToDos(newToDos);
  }
```

Storage Key인 @toDos를 STORAGE_KEY 변수에 담고 이 변수를 setItem의 Storage Key로 사용한다.
```javascript
const STORAGE_KEY = "@toDos";

await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
```

JSON의 parse를 사용하여 string을 Javascript Object로 바꾼 뒤 setToDos로 전달하는 loadToDos 함수 구현한다.
```javascript
const loadToDos = async() => {
          const string = await AsyncStorage.getItem(STORAGE_KEY);
          setToDos(JSON.parse(string);
};
```

useEffect를 사용해서 화면이 렌더링 될 때 loadToDos 함수를 실행시키도록 설정한다.
```javscript
useEffect(() => {
    loadToDos();
  }, []);
```

loadToDo 함수의 오류와 안정성의 문제로 try catch문을 사용해서 다음과 같이 구현한다.
```javascript
async function loadToDos() {
    try {
      const jsonPayload = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonPayload != null ? setToDos(JSON.parse(jsonPayload)) : null;
    } catch (error) {
        console.log(error);
    }
}
```

## ToDo 리스트 항목 삭제 버튼 구현하기

버튼의 쓰레기통 이모지를 import 해준다. 
```javascript
import { Fontisto } from "@expo/vector-icons";
```
쓰레기통 이모지를 구현하고 눌렀을 때 deleteToDo 함수가 실행되도록 구현한다.
```javascript
<TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={18} color={theme.grey} />
</TouchableOpacity>
```

버튼을 감싸고 있는 toDo의 스타일에 다음과 같은 속성들을 추가한다.
```javascript
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
```

delete함수를 구현할 때 Alert API를 사용하기 위해서 Alert를 import한다.
```javascript
import { Alert } from 'react-native';
```

deleteToDo 함수를 delete 키워드를 사용해서 구현한다.
```
const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        onPress: () => {
          const newToDos = { ...toDos };  // state의 내용으로 새로운 newToDos를 생성
          delete newToDos[key]; // delete 키워드를 사용해서 newToDos 안의 key를 삭제
          setToDos(newToDos); // state를 새로운 newToDos로 업데이트
          saveToDos(newToDos); // AsyncStorage에 저장
        },
      },
    ]);
  };
```

## App.js 코드 최종

Work Travel App의 최종 코드는 다음과 같다.
```javascript
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './colors';
import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@toDos";

export default function App() { 
  const [working, setWorking] = useState(true); // work일때 상태를 저장하는 useState 함수 생성
  const [text, setText] = useState(""); // 입력한 Text의 상태를 저장하는 useState 함수 생성
  const [toDos, setToDos] = useState({}); // toDos의 상태를 저장하는 useState 함수 생성
  useEffect(() => {
    loadToDos();
  }, []);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);  
  const onChangeText = (payload) => setText(payload); // payload = event
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }; 
  async function loadToDos() {
    try {
      const jsonPayload = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonPayload != null ? setToDos(JSON.parse(jsonPayload)) : null;
    } catch (error) {
        console.log(error);
    }
}
  const addToDo = async () => {
    if(text === "") {
      return
    }
    const newToDos = { ...toDos, [Date.now()]: {text, working} }; 
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };
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
          <ScrollView>
            {Object.keys(toDos).map(key =>
              toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>
                  {toDos[key].text}
                </Text>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={18} color={theme.grey} />
                </TouchableOpacity>
              </View>
              ) : null
            )}
          </ScrollView>
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
    marginVertical: 20,
  },
  toDo: {
    backgroundColor: theme.toDoBackground,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toDoText: {
    color: 'white',
    fontSize: 16,
    fontWeight:"500",
  }
});
```
