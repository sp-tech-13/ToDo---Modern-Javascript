'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoListClass = function () {
  function ToDoListClass() {
    _classCallCheck(this, ToDoListClass);

    var savedTasks = localStorage.getItem('TASKS');

    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }

    if (!this.tasks) {
      this.tasks = [{ task: 'Test Task 1', isComplete: false }, { task: 'Test Task 2', isComplete: true }, { task: 'Test Task 3', isComplete: false }];
    }
    this.loadTasks();
    this.addEventListener();
  }

  _createClass(ToDoListClass, [{
    key: 'addEventListener',
    value: function addEventListener() {
      var _this = this;

      document.getElementById('addTask').addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
          _this.addTask(event.target.value);
          event.target.value = '';
        }
      });
    }
  }, {
    key: 'addTaskClick',
    value: function addTaskClick() {
      var elem = document.getElementById('addTask');
      this.addTask(elem.value);
      elem.value = '';
    }
  }, {
    key: 'addTask',
    value: function addTask(value) {

      var obj = {
        task: value,
        isComplete: false
      };

      var parentDiv = document.getElementById('addTask').parentElement;

      if (obj.task) {
        parentDiv.classList.remove('has-error');
        this.tasks.push(obj);
        this.loadTasks();
      } else {
        parentDiv.classList.add('has-error');
      }
    }
  }, {
    key: 'deleteTask',
    value: function deleteTask(event, index) {
      event.preventDefault();
      this.tasks.splice(index, 1);
      this.loadTasks();
    }
  }, {
    key: 'addLocalStorage',
    value: function addLocalStorage(value) {
      localStorage.setItem('Tasks', value);
    }
  }, {
    key: 'removeLocalStorage',
    value: function removeLocalStorage() {
      localStorage.removeItem();
    }
  }, {
    key: 'toggleTaskStatus',
    value: function toggleTaskStatus(index) {
      this.tasks[index].isComplete = !this.tasks[index].isComplete;
    }
  }, {
    key: 'generateHtml',
    value: function generateHtml(task, index) {
      return '\n        <li class="list-group-item checkbox">\n        <div class="row">\n          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">\n            <label>\n              <input \n                type="checkbox" \n                value="" \n                class="" \n                ' + (task.isComplete ? 'checked' : '') + '\n                onchange="todo.toggleTaskStatus(' + index + ')">\n            </label>\n          </div>\n          <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ' + (task.isComplete ? 'complete' : '') + '">\n            ' + task.task + '\n          </div>\n          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">\n            <a class="" href="/" onclick="todo.deleteTask(event, ' + index + ')">\n                <i class="delete-icon glyphicon glyphicon-trash"></i>\n            </a>\n          </div>\n        </div>\n      </li>';
    }
  }, {
    key: 'loadTasks',
    value: function loadTasks() {
      var _this2 = this;

      localStorage.setItem('TASKS', JSON.stringify(this.tasks));
      var htmlTask = this.tasks.reduce(function (html, task, index) {
        return html += _this2.generateHtml(task, index);
      }, '');
      document.getElementById('taskList').innerHTML = htmlTask;
    }
  }]);

  return ToDoListClass;
}();

var todo = void 0;
window.addEventListener('load', function () {
  todo = new ToDoListClass();
});
//# sourceMappingURL=scripts.js.map