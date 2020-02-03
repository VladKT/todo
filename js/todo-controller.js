'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    if (!todos.length && gFilterBy ==='ALL') {
        document.querySelector('.info').innerText = 'No Todos';
    }
    if (!todos.length && gFilterBy ==='Done') {
        document.querySelector('.info').innerText = 'No Done Todos';
    }
    if (!todos.length && gFilterBy ==='Active') {
        document.querySelector('.info').innerText = 'No Active Todos';
    }
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone)? 'done' : '';
        return `
        <li onclick="onTodoToggle(${todo.id})" class="${className}">
            ${todo.txt}
            <button onclick="onRemoveTodo(event, ${todo.id})">x</button>
        </li>`
    })
    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');
    renderStats();
}

function renderStats() {
    document.querySelector('.todo-count').innerText = getTodoCount();
    document.querySelector('.active-count').innerText = getActiveTodoCount();
}

function onRemoveTodo(event, todoId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeTodo(todoId);
        renderTodos();
    }
}
function onAddTodo() {
    console.log('onAddTodo');
    var elTxt = document.querySelector('.add-todo-container input');
    var elImp = document.querySelector('.imp-option');
    var txt = elTxt.value;
    var imp = elImp.value;
    if (!txt) return;
    addTodo(txt,imp)
    elTxt.value = '';
    renderTodos();
}

function onTodoToggle(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onFilterChanged(filterBy) {
    setTodoFilter(filterBy);
    renderTodos();
}

function onSortChanged(sortBy) {
    setTodoSort(sortBy);
    renderTodos();
}