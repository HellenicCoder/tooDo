document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Load tasks from local storage
    loadTasks();

    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const task = todoInput.value.trim();
        if (task === '') {
            alert('Please enter a task.');
            return;
        }

        const todoItem = createTodoItem(task);
        todoList.appendChild(todoItem);
        todoInput.value = '';
        saveTasks();
    }

    function createTodoItem(task) {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
            <span class="task">${task}</span>
            <button class="delete-button">Delete</button>
        `;

        todoItem.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = todoItem.querySelector('.delete-button');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            todoList.removeChild(todoItem);
            saveTasks();
        });

        return todoItem;
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.todo-item').forEach(item => {
            tasks.push({
                task: item.querySelector('.task').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskObj => {
            const todoItem = createTodoItem(taskObj.task);
            if (taskObj.completed) {
                todoItem.classList.add('completed');
            }
            todoList.appendChild(todoItem);
        });
    }
});
