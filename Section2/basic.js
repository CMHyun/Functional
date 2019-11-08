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
 
 // 1. 명령형 코드
    // 1. 30세 이상인 users를 거른다.
    const temp_users = [];
    for ( let i = 0; i < users.length; i++ ) {
        if (users[i].age >= 30) {
            temp_users.push(users[i]);
        }
    }
    console.log( temp_users );

    // 2. 30세 이상인 users의 name를 수집한다.
    const names = [];
    for (let i = 0; i < temp_users.length; i++) {
        names.push(temp_users[i].name);
    }
    console.log(names)

    // 3. 30세 미만인 users를 거른다.
    const temp_users2 = [];
    for ( let i = 0; i < users.length; i++ ) {
        if (users[i].age < 30) {
            temp_users2.push(users[i]);
        }
    }
    console.log( temp_users2 );

    // 4. 30세 미만인 users의 ages를 수집힌다.
    const ages = [];
    for (let i = 0; i < temp_users2.length; i++) {
        ages.push(temp_users2[i].age);
    }
    console.log(ages);


// --------------------------------------------------------------------------------------------------------------------------------


// 2. _filter, _map으로 리팩토링
    // 응용형 함수(함수가 함수를 인자로 받아서 원하시는 시점에 해당하는 함수가 알고있는 인자를 적용해나가는 식으로 로직을 완성해 나가는 프로그래밍)
    // '고차함수'라고도 부름.
    function _filter(users, predicate) {
        const new_list = [];
        for ( let i = 0; i < users.length; i++ ) {
            if (predicate(users[i])) {
                new_list.push(users[i]);
            }
        }
        return new_list;
    }
    console.log( 
        _filter(users, function(user) { return user.age >= 30; })
    );
    console.log( 
        _filter(users, function(user) { return user.age < 30; })
    );
    
    // 다형성 및 재활용성이 높은 함수가 된 case
    // console.log(
    //     _filter([1, 2, 3, 4], function(num) { return num % 2; })
    // );
    
    // console.log(
    //     _filter([1, 2, 3, 4], function(num) { return !(num % 2); })
    // );

    // Map 함수
    // Mppaer라는 함수를 받아서 무엇을 수집해서 넣을 것인지를 위임한다.
    // 그렇게 하면 데이터형이 어떻게 생겼는지 하나도 보이지 않는다. 이것은 함수형 프로그래밍의 특징
    function _map(list, mapper) {
        const new_list2 = [];
        for ( let i = 0; i < list.length; i++ ) {
            new_list2.push( mapper(list[i]) );
        }
        return new_list2;
    }
    const over_30 = _filter(users, function(user) { return user.age >= 30; });
    console.log('map first: ', over_30);

    const map_names = _map(over_30, function(user) {
        return user.name;
    });
    console.log(map_names);

    const under_30 = _filter(users, function(user) { return user.age < 30; });
    console.log(under_30);

    const map_ages = _map(under_30, function(user) {
        return user.age;
    });
    console.log(map_ages);

    // 다형성 및 재활용성 높은 것을 입증
    // console.log(_map([1, 2, 3], function(num) { return num * 2; }));

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