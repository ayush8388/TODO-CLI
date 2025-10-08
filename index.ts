const path = require('path');
const fs = require('fs');

const todoList = path.join(__dirname, 'Todos.json');


interface TodoTypes {
  id: number;
  title: string;
  completed: boolean;
}

const ShowTodos = (): TodoTypes[] => {
    const data = fs.readFileSync(todoList, 'utf8');
    return JSON.parse(data);
}

const saveTodos = (Todo: TodoTypes[]) => {
    fs.writeFileSync(todoList, JSON.stringify(Todo, null, 2));
}

const args = process.argv.slice(2);
const command = args[0];

console.log('TODO');
console.log('Available commands:');
console.log('list');
console.log('add');
console.log('completed');
console.log('delete');


switch(command){
    case 'add':{
        const task = args.slice(1).join(' ');
        const todos = ShowTodos();
        todos.push({
            id: todos.length + 1,
            title: task,
            completed: false
        });
        saveTodos(todos);
        console.log(`Added todo: ${task}`);
        break;
    }
    case 'list':{
        const todos = ShowTodos();
        if (todos.length === 0) {
            console.log('No todos found!');
            break;
        }
        todos.forEach((todo) =>{
            const check = todo.completed? '✅' : '❌';
            console.log(`${todo.id} - ${todo.title} ${check}`);
        })
        break;
    }
    case 'completed':{
        const todos = ShowTodos();
        const todo = todos.find((t) => t.id === Number(args[1]));
        if (!todo) {
            console.log('Todo not found!');
            break;
        }
        todo.completed = true;
        saveTodos(todos);
        console.log(`Completed todo: ${todo.title}`);
        break;
    }
    case 'delete':{
        const todos = ShowTodos();
        const todo = todos.find((t) => t.id === Number(args[1]));
        if (!todo) {
            console.log('Todo not found!');
            break;
        }
        todos.splice(todos.indexOf(todo), 1);
        saveTodos(todos);
        console.log(`Deleted todo: ${todo.title}`);
        break;
    }
}