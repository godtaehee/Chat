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

## 리액트 없이 쓰는 리덕스

리덕스는 리액트에 종속되는 라이브러리가 아니다.

리액트에서 사용하려고 만들어졌지만 다른 UI라이브러리/프레임워크(angular-redux, ember redux, Vue)에서도 사용하지만 Vue에서는 리덕스와 유사한 vuex를 주로 사용한다.

### 액션 타입과 액션 생성 함수 정의

프로젝트의 상태에 변화를 일으키는 것을 액션이라고 한다.

먼저 액션에 이름을 줘야하는데 액션 이름은 문자열 형태로, 주로 대문자로 작성하며 액션 이름은 고유해야한다. 이름이 중복되면 의도하지 않은 결과가 발생할수 있기 때문이다.

```javascript
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

const initialState = {
  toggle: false,
  counter: 0,
};

// state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지를 해 주어야 합니다.
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

```

리듀서에서는 상태의 불변성을 유지하면서 데이터에 변화를 일으켜 주어야 한다.

이 작업을 할때 spread 연산자를 사용하면 편하다.

객체의 구조가 복잡해지거나 배열도 함께 다루는 경우 immer 라이브러리르 사용하면 좀 더 쉽게 리듀서를 작성할 수 있다.

### 스토어 만들기

redux에서 스토어만드는 함수를 불러와서 그 함수의 매개변수로 리듀서를 넣어준다.

```javascript
import { createStore } from 'redux';

(...) // 어떤 코드

const store = createStore(reducer);
```

컴포넌트에서 리덕스 상태를 조회하는 과정에서 subscribe는 react-redux라이브러리가 대신해준다.

## 리덕스의 세 가지 규칙

### 단일 스토어

하나의 애플리케이션 안에는 하나의 스토어가 들어 있으며 여러개 스토어가 불가능한건 아니다.

특정 업데이트가 너무 빈번하게 일어나거나 애플리케이션의 특정 부분을 완전히 분리시킬 때 여러 개의 스토어를 만들 수도 있지만, 상태 관리가 복잡해질 수 있으므로 권장하지 않는다.

### 읽기 전용 상태

리덕스 상태는 읽기 전용입니다. 기존에 리액트에서 setState를 사용하여 state를 업데이트할 때도 객체나 배열을 업데이트 하는 과정에서 불변성을 지켜주기 위해 spread 연산자를 사용하거나 immer와 같은 불변성 관리 라이브러리르 사용했던것처럼 리덕스도 마찬가지이다.

**상태를 업데이트 할 때 기존의 객체는 건드리지 않고 새로운 객체를 생성해 주어야 합니다.**

리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경되는 것을 감지하기 위해 얕은 비교(shallow equality) 검사를 하기 때문입니다. 객체의 변화를 감지할 때 객체의 깊숙한 안쪽까지 비교하는 것이 아니라 겉햝기 식으로 비교하여 좋은 성능을 유지할 수 있는 것이다.

### 리듀서는 순수한 함수

변화를 일으키는 리듀서 함수는 순수한 함수여야 합니다. 순수한 함수는 다음 조건을 만족한다.

- 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받습니다.
- 파라미터 외의 값에는 의존하면 안 됩니다.
- 이전 상태는 절대로 건드리지 않고, 변화를 준 새로운 상태 객체를 만들어서 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과 값을 반환해야 한다.

리듀서를 작성할 때는 위 네 가지 사항을 주의해야 한다. 예를 들어 리듀서 함수 내부에서 랜덤 값을 만들거나, Date함수를 사용하여 현재 시간을 가져오거나, 네트워크 요청을 한다면, 파라미터가 같아도 다른 결과를 만들어 낼 수 있기 때문에 사용하면 안된다.

이러한 작업은 리듀서 함수 바깥에서 처리를 해줘야한다. 액션을 만드는 과정에서 처리해도 되고, 추후 배울 리덕스 미들웨어에서도 처리해도 됩니다. 주로 네트워크 요청과 같은 비동기 작업은 미들웨어를 통해 관리한다.

### 리덕스 프로젝트에 적용하는 대략적인 플로우

1. 액션 타입, 액션 함수 작성
2. 리듀서를 작성
3. 스토어 만들기

## 기초 프젝 해보기 깃헙

[여기에 해봄](https://github.com/godtaehee/parcel-basic-redux-trainning)

