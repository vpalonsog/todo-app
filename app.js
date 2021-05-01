const tarea = document.querySelector('#inputTask')
const todoItems = document.querySelector('#tasks-list') // Lista de tareas en HTML


// Contador para generar los id's de las tareas
let counterId = 1
// Lista de objetos (tareas) en Javascript. NO confundir con LIST ITEMS del HTML.
const taskList = []

// Cuando se le da click a un botón completar actualizar la tarea como completada
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-complete-task')) {
    
    const taskDetail = e.target.parentElement.parentElement.querySelector('.task-detail')
    const taskId = taskDetail.getAttribute('data-id')
    completeTask(taskId)

  } else if (e.target.classList.contains('remove-task')) {
    const taskDetailRemove = e.target.parentElement.parentElement.querySelector('p')
    const taskId = taskDetailRemove.getAttribute('data-id')
    
    removeTask(taskId)
    
  }


})

tarea.addEventListener('keyup', function (e) {
  if (e.code == 'Enter') {
    // console.log('Se presionó ENTER!')
    addTaskToList()
  }
})

function addTaskToList() {
  const task = {
    id: counterId,
    detail: tarea.value,
    completed: false,
  }
  taskList.push(task)
  counterId++

  updateTaskListInHTML()
}

function updateTaskListInHTML() {
  let auxHtml = '';
  for (const task of taskList) {
    
    auxHtml += `
      <div class="task">
        
    
        <div> 
          <input class="btn-complete-task" type="button" value="Completar"> 
        </div>
        
        <div>
          <p class="task-detail ${task.completed?'task-completed':''}" data-id='${task.id}'>${task.detail}</p>
        </div>
        
        <div>
          <i class="remove-task fas fa-times"></i>
        </div>
      </div>
  `;
  }

  todoItems.innerHTML = auxHtml;

}

function completeTask(taskId) {
  
  for (const task of taskList) {

    if (task.id == taskId ) {
      task.completed = true
    }

  }

  updateTaskListInHTML()


}

function removeTask(taskId) {
  // Encontrar la tarea que tiene el id == taskId
  for (let i = 0; i < taskList.length; i++) {
    
    

    if (taskList[i].id == taskId) {
      // Borra la tarea
      taskList.splice(i,1)
    }
    
  }

  updateTaskListInHTML()


}
