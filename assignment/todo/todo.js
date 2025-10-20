const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    const todo = todoInput.value.trim();
    if(!todo || todo=='') return;

    const newTodo ={
        id: Date.now(),
        title: todo,
        completed: false
    }
    todos.push(newTodo);
    todoInput.value = '';
    renderTodos();

});

function renderTodos(){
    todoList.innerHTML ='';

    todos.forEach(todo =>{
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed':'';
        li.innerHTML =`
            <span>${todo.title}</span>
            <button class="complete-btn onclick="toggleComplete(${todo.id})>Complete</button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            `;
            todoList.appendChild(li);

        
    })

}
function toggleComplete(id){
    todos = todos.map(todo => todo.id ===id ? {...todo, completed: !todo.completed} : todo);
    renderTodos();
}

function deleteTodo(id){
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}