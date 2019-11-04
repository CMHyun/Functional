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

    // 1. _each로 _map, _filter 중복 제거
        // for문을 돌면서 iterate
        function _each(list, iter) {
            for ( let i = 0; i < list.length; i++ ) {
                iter(list[i]);
            }
            return list;
        }

        // filterd의 기존 코드
        // function _filter(users, predicate) {
        //     const new_list = [];
        //     for ( let i = 0; i < users.length; i++ ) {
        //         if (predicate(users[i])) {
        //             new_list.push(users[i]);
        //         }
        //     }
        //     return new_list;
        // }

        // ecah으로 리팩토링한 코드
        function _filter(users, predicate) {
            const new_list = [];
            _each(users, function(val) {
                if ( predicate(val) ) {
                    new_list.push(val);
                }
            });

            return new_list;
        }

        // Map의 기존 코드
        // function _map(list, mapper) {
        //     const new_list2 = [];
        //     for ( let i = 0; i < list.length; i++ ) {
        //         new_list2.push( mapper(list[i]) );
        //     }
        //     return new_list2;
        // }

        // each로 리팩토링한 코드
        function _map(list, mapper) {
            const new_list2 = [];
            _each(list, function(val) {
                new_list2.push( mapper(val) );
            });
            
            return new_list2;
        }

        // 결과
        console.log(
            _map(
                _filter(users, function(user) { return user.age >= 30; }),
                function(user) { return user.name; })
        );
        
        
        console.log(
            _map(
                _filter(users, function(user) { return user.age < 30; }),
                function(user) { return user.age; })
        );



// array에는 이미 구현된 map과 filter가 있다! 
// 2. 외부 다형성
    // 1. array_like, arguments, document.querySelectorAll
    // 이미 구현된 Map method(순수함수X, 객체 상태에 따라 결과가 달라짐)
    console.log(
        [1, 2, 3, 4].map(function(val) {
            return val * 2;
        })
    );

    // 이미 구현된 Filter method(순수함수X, 객체 상태에 따라 결과가 달라짐)
    console.log(
        [1, 2, 3, 4].filter(function(val) {
            return val % 2;
        })
    );

    // array(배열)이 아니라 array_like 객체이다.
    console.log(document.querySelectorAll('*'));
    
    // 해당하는 노드를 받아 노드의 이름을 받는 코드를 만들고 싶어서 만들면, Error 발생!
    // Uncaught TypeError: document.querySelectorAll(...).map is not a function
    // console.log(
    //     document.querySelectorAll('*').map(function(node) {
    //         return node.nodeName;
    //     })
    // );
    
    // NodeList는 Array가 아니다!
    
    // 위에 객체지향적으로 이미 만들어진 map 메소드로는 불가능한 것을 위에서 만든 _map 함수로 실행
    console.log(
        _map(document.querySelectorAll('*'), function(node) {
            return node.nodeName;
        })
    );

    // 3. 내부 다형성
        // 1. predi, iter, mapper
        
        // 2번째 역할을 하는 함수에 따라 다양한 이름을 가진다.
        // callback 함수: 어떤 일들을 다 수행하고 마지막으로 돌려줄 때
        // predi: 조건을 return하는 함수
        // iter: 돌면서 반복적으로 실행하는 함수
        // mapper: 무언가 무언가를 매핑하는 함수
        _map([1, 2, 3, 4], function(v) {
            return v + 10;
        });

        
