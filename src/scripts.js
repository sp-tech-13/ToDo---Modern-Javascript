class ToDoListClass {

    constructor() {

      const savedTasks = localStorage.getItem('TASKS');

      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }

      if(!this.tasks) {
        this.tasks = [
          { task: 'Test Task 1', isComplete: false },
          { task: 'Test Task 2', isComplete: true },
          { task: 'Test Task 3', isComplete: false }
        ]
      }
      this.loadTasks();
      this.addEventListener();
        
    }

    addEventListener() {
      document.getElementById('addTask').addEventListener('keypress', event => {
        if(event.keyCode === 13) {
          this.addTask(event.target.value);
          event.target.value = '';
        }
      });
    }

    addTaskClick() {
      const elem = document.getElementById('addTask');
      this.addTask(elem.value);
      elem.value = '';

    }

    addTask(value) {

      let obj = {
        task: value,
        isComplete: false
      }

      let parentDiv = document.getElementById('addTask').parentElement;

      if(obj.task) {
        parentDiv.classList.remove('has-error');
        this.tasks.push(obj);
        this.loadTasks();
      } else {
        parentDiv.classList.add('has-error');
      }
    }

    deleteTask(event, index) {
        event.preventDefault();
        this.tasks.splice(index, 1);
        this.loadTasks();
    }

    addLocalStorage(value) {
      localStorage.setItem('Tasks', value);
    }

    removeLocalStorage() {
      localStorage.removeItem()
    }

    toggleTaskStatus(index) {
      this.tasks[index].isComplete = !this.tasks[index].isComplete;
    }

    generateHtml(task, index) {
        return `
        <li class="list-group-item checkbox">
        <div class="row">
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
            <label>
              <input 
                type="checkbox" 
                value="" 
                class="" 
                ${task.isComplete ? 'checked' : '' }
                onchange="todo.toggleTaskStatus(${index})">
            </label>
          </div>
          <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete ? 'complete' : ''}">
            ${task.task}
          </div>
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
            <a class="" href="/" onclick="todo.deleteTask(event, ${index})">
                <i class="delete-icon glyphicon glyphicon-trash"></i>
            </a>
          </div>
        </div>
      </li>`
    }

    loadTasks() {
      localStorage.setItem('TASKS', JSON.stringify(this.tasks));
      let htmlTask = this.tasks.reduce((html, task, index) => html += this.generateHtml(task, index), '');
      document.getElementById('taskList').innerHTML = htmlTask;    
    }
}

let todo;
window.addEventListener('load', () => {
    todo = new ToDoListClass();
    
});