export const users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 },
]; 

export function _each(list, iter) {
    for ( let i = 0; i < list.length; i++ ) {
        iter(list[i]);
    }
    return list;
}

export function _filter(users, predicate) {
    const new_list = [];
    _each(users, function(val) {
        if ( predicate(val) ) {
            new_list.push(val);
        }
    });

    return new_list;
}

export function _map(list, mapper) {
    const new_list2 = [];
    _each(list, function(val) {
        new_list2.push( mapper(val) );
    });
    
    return new_list2;
}