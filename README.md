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


