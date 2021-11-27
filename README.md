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


        
      


