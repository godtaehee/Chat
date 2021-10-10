## React Router Dom

React는 `Link`라는 태그를 이용해 라우팅 처리를 한다.

이게 원래는 a태그로하는데 리엑트 라우터 돔에서는 `Link`를 사용한다.

링크를 누르면 Link가 Switch태그 안에를 둘러보면서 자신의 `to` attribute에 있는 Route와 맞는것을 찾는다.

`Router` 안에 `Switch`,
`Switch` 안에 `Link` 혹은 `Route`


## Redux

### 액션

상태에 어떠한 변화가 필요하면 액션이란 것이 발생한다.

액션은 하나의 객체로 표현되며 `type`이 필수로 있어야한다.

`type`외의 나머지는 상태 업데이트를 할 때 참고해야할 값들이다.

### 액션 생성 함수

```javascript
// 그냥 함수
function addTodo(data) {
  return {
    type: 'ADD_TODO',
    data
  };
}

// 화살표 함수
const changeInput = text = > ({
  type: 'CHANGE_INPUT',
  text
});
```

어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있다. 이러한 일을 방지하기 위해 이를 함수로 만들어 관리한다.

### 리듀서 (reducer)

리듀서는 변화를 일으키는 함수이다.

액션을 만들어서 발생 시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아온다.

두 값을 참고하여 새로운 상태를 만들어서 반환해 줍니다.

리듀서 코드는 다음과 같은 형태로 이루어져 있다.

```javascript
const initialState = {
  counter: 1
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + 1
      };
    default:
      return state;
  }
}
```

### 스토어

프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만든다. 한 개의 프로젝트에는 단 하나의 스토먼 가질 수 있습니다. 스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 내장 함수를 지닌다.

### 디스패치

디스패치(dispatch)는 스토어의 내장 함수 중 하나입니다. 디스패치는 '액션을 발생 시키는 것'이라고 이해하면 된다.

이 함수는 `dispatch(action)`과 같은 형태로 액션 객체를 파라미터로 넣어서 호출한다.

### 구독

구독(subscribe)도 스토어의 내장 함수 중 하나입니다. subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출해 주면, 이 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출됩니다.

```javascript
const listener = () => {
  console.log('상태가 업데이트됨');
}
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화 할 때 함수를 호출
```

