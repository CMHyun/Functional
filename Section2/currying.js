// function includeJs(jsFilePath) {
//     const js = document.createElement("script");
//     js.type = "text/javascript";
//     js.src = jsFilePath;
//     document.body.appendChild(js);
// }
// includeJs("./util.js");


const users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 },
]; 

function _each(list, iter) {
    for ( let i = 0; i < list.length; i++ ) {
        iter(list[i]);
    }
    return list;
}

function _filter(users, predicate) {
    const new_list = [];
    _each(users, function(val) {
        if ( predicate(val) ) {
            new_list.push(val);
        }
    });

    return new_list;
}

function _map(list, mapper) {
    const new_list2 = [];
    _each(list, function(val) {
        new_list2.push( mapper(val) );
    });
    
    return new_list2;
}


/* 3. 커링
    커링을 함수와 인자를 다루는 기법
    함수의 인자를 하나씩 적용해나가다가 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법

    1. _curry, _curryr
    2. _get 만들어 좀 더 간단하게 하기
*/

// 1. _curry, _curryr
    // function _curry(fn) {
    //     return function(a, b) {
    //         // 인자가 2개 들어왔을 경우 한 번에 즉시 평가하도록 실용성을 높인다. 
    //         if (arguments.length == 2) return fn(a, b);
            
    //         // 아니라면 함수 실행을 한 번더 미루는
    //         return function(b) {
    //             // 미리 받아두었던 함수 본체를 평가
    //             return fn(a, b);
    //         };
    //     };
    // }

    // 위 방식을 삼항연산자로 변경
    function _curry(fn) {
        return function(a, b) {
            return arguments.length == 2 ? fn(a, b) : function(b) { return fn(a, b); };
        };
    }

    function _curryr(fn) {
        return function(a, b) {
            return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
        };
    }


    // before
    // const add = function(a, b) {
    //     return a + b;
    // };
    // console.log( add(10, 5) );

    // after
    const add = _curry(function(a, b) {
        return a + b;
    });

    const add10 = add(10);
    console.log( add10(5) );
    console.log( add(5)(3) );
    console.log( add(1, 2) );


    // 빼기 함수
    const sub = _curryr(function(a, b) {
        return a - b;
    });
    console.log( sub(5, 3) );

    const sub10 = sub(10);
    console.log( sub10(5) ); // 표현이 조금 이상 5에서 10을 빼는 듯한.. 오른쪽에서 부터 적용하는 curry_right를 만들면 좋을 것 같다.



// get은 object를 안전하게 참조하기 위한
function _get(obj, key) {
    return obj == null ? undefined : obj[key];
}

const user1 = users[0];
console.log(user1.name);
console.log(_get(user1, 'name'));

// console.log(users[20].name); // result(ERROR): Uncaught TypeError: Cannot read property 'name' of undefined
console.log(_get(users[20], 'name')); // result: undefined


// get 함수를 curryr 형태로 바꿔서 인자 순서를 변경하는 방법
const _getr = _curryr(function(obj, key) {
    return obj == null ? undefined : obj[key];
});
// function(obj, key) {
//     return arguments.length == 2 ? fn(obj, key) : function(key) { return fn(key, obj); };
// };

console.log(_getr('name')(user1));

const get_name = _getr('name');
console.log( get_name(user1) );


//
console.log(
    _map(_filter(users, function(user) { return user.age >= 30; }), _getr('name')) );


console.log(
    _map(_filter(users, function(user) { return user.age < 30; }), _getr('age')) );