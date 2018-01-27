window.onload = function() {

    var todosFromLocalStorage = getFromLocalStorage();
    for (let i = 0; i < todosFromLocalStorage.length; i++) {
        writeToDom(todosFromLocalStorage[i]);
    }

    document.getElementById('button').addEventListener('click', addTask);
    document.getElementById('input').addEventListener('keypress', oneAddTask);
    document.querySelector('#clear').addEventListener('click', clearLocalStorageAndDom);

    function oneAddTask(e) {
        if (e.which == 13) {
            return addTask();
        }
    }

    function addTask() {
        let input = document.querySelector('#input');
        let text = input.value.trim(); 
        if(!text) return; 
        let todos = getFromLocalStorage();  
       
        let obj = { 
            'text': text,
            'completed': false,
            'id': Math.floor(Math.random()*1000 + 1)
        };
        writeToLocalStorage(obj);
        writeToDom(obj);
        input.value = '';
        
    }

    function getFromLocalStorage() {
        const todosJSON = localStorage.getItem('todo'); 
        let todos = []; 
        if(todosJSON){
          todos = JSON.parse(todosJSON); 
        }
        return todos; 
    } 

    function writeToLocalStorage(todo){
        let todos = getFromLocalStorage();
        todos.push(todo);
        localStorage.setItem('todo',JSON.stringify(todos));
    }

    function writeToDom(todo) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = todo.id;
        checkbox.classList = 'check';

        var span = document.createElement('span');
        span.innerHTML = todo.text;

        if(todo.completed == true){
            span.classList = 'taskCompleted';
            checkbox.setAttribute("checked", "checked");
        }    
        else{
            span.classList = "text";
        }
         
        var remove = document.createElement('span');
        remove.style.fontSize = '20px';
        remove.innerHTML = '× <br>';
        remove.classList = "remove";
        remove.id = todo.id;

        var todo = document.getElementById('todo');
        todo.appendChild(checkbox);
        todo.appendChild(span);
        todo.appendChild(remove);

        checkbox.addEventListener('change',completeTask);
        remove.addEventListener('click',deleteTask);
        
    }

    function deleteFromLocalStorageById(id) {
        let todos = getFromLocalStorage();

        todos = todos.filter(function (elem) {
            return elem.id != id;  
        }); 
        
        localStorage.setItem('todo',JSON.stringify(todos));
    }

    function deleteTask() {
        deleteFromLocalStorageById(this.id);
        this.previousElementSibling.previousElementSibling.remove();
        this.previousElementSibling.remove();
        this.remove();
    }

    function completeTask() {
        let todos = getFromLocalStorage();

        if (this.checked) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i]['id'] == this.name) {
                    todos[i]['completed'] = true;
                    this.nextElementSibling.classList = 'taskCompleted';
                    this.classList = 'checkboxCompleted';
                }

            }
        } else {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i]['id'] == this.name) {
                todos[i]['completed'] = false;
                this.nextElementSibling.classList = 'check';
                this.classList = 'check';
                }
            }

            this.nextElementSibling.classList = 'text'; 
        }

        localStorage.setItem('todo',JSON.stringify(todos));
        
    }

    function clearLocalStorageAndDom() {
        document.querySelector('#todo').innerHTML = ''; 
        localStorage.removeItem("todo");
    }



}