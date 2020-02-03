const KEY = 'todos'
var gTodos = _createTodos();
var gFilterBy = 'All';
var gSortBy = 'txt';

var testArr = [{ txt:'bca', num: 6}, { txt:'amt', num: 7}, { txt:'bat', num: 3}];

// function testSort(arr) {

//     var sortedArr = arr.slice();
//     sortedArr.sort((a, b) => (a[gSortBy] > b[gSortBy]) ? 1:-1);
//     return sortedArr;
// }
// console.log('original:', testArr);
// console.log('sorted: ', testSort(testArr));

function getTodosForDisplay() {
    if (gFilterBy === 'All') return sortTodos(gTodos);
    var todosForDisplay = gTodos.filter(function (todo) {
        return (gFilterBy === 'Done' && todo.isDone) ||
            (gFilterBy === 'Active' && !todo.isDone)
    })
    var todosForDisplaySorted = sortTodos(todosForDisplay);
    return todosForDisplaySorted;
    // return todosForDisplay;
}

function sortTodos(todos) {
    todos.sort((a, b) => (a[gSortBy] > b[gSortBy]) ? 1:-1);
    console.log('Sorted',todos);
    return todos;
}

function getTodoCount() {
    return gTodos.length
}
function getActiveTodoCount() {
    var count = gTodos.reduce(function (acc, todo) {
        return acc + ((todo.isDone) ? 0 : 1);
    }, 0);
    return count;
}


function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    saveToStorage(KEY, gTodos);
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    saveToStorage(KEY, gTodos);

}

function addTodo(txt, imp) {
    var todo = _createTodo(txt, imp);
    gTodos.unshift(todo);
    saveToStorage(KEY, gTodos);
}


function setTodoFilter(filterBy) {
    gFilterBy = filterBy;
}

function setTodoSort(sortBy) {
    switch(sortBy) {
        case "ABC":
            gSortBy = "txt";
          break;
          case "Created":
            gSortBy = "date";
          break;
        case "Importance":
            gSortBy = "importance";
          break;
    }      
}


// Private functions:
function _createTodos() {
    var todos = loadFromStorage(KEY);
    if (todos) return todos;

    var todos = ['Learn HTML', 'Master CSS', 'Enjoy Javascript']
        .map(_createTodo)

    return todos;
}

function _createTodo(txt, imp = 1) {
    return {
        id: parseInt(Math.random() * 1000),
        txt: txt,
        isDone: false,
        date: Date.now(),
        importance: +imp
    }
}