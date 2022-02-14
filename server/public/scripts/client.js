$(document).ready(() => {
  setupClickListeners();
  getTasks();
});

function setupClickListeners() {
  $("#addTaskButton").on("click", () => {
    console.log("Add Task Button Works");
    createTask($("#newTask").val(), $("#newNote").val());
  });
  $("#viewList").on("click", ".deleteBtn", deleteTask);
  $("#viewList").on("click", ".isCompletedBtn", completeTask);
}

function getTasks() {
  console.log("in getTasks");
  $("#viewList").empty();
  $.ajax({
    type: "GET",
    url: "/weekend-to-do-app",
  })
    .then(function (toDos) {
      console.log(toDos);
      toDos.forEach((toDo) => {
        if (toDo.isCompleted) {
          $("#viewList").append(`
              <tr class="${toDo.isCompleted ? "is-completed" : ""}" id="row-${toDo.id}">
      
              <td>${toDo.task}</td>
              <td>${toDo.notes}</td>
              <td><span>Completed</span></td>
              <td><button class="deleteBtn" data-id='${toDo.id}'>Delete</button></td>
              </tr>
              `);
        } else {
          $("#viewList").append(`
            <tr class="${toDo.isCompleted ? "is-completed" : ""}" id="row-${toDo.id}">
    
            <td>${toDo.task}</td>
            <td>${toDo.notes}</td>
            <td><button class="isCompletedBtn" data-id='${toDo.id}'>Complete</button></td>
            <td><button class="deleteBtn" data-id='${toDo.id}'>Delete</button></td>
            </tr>
            `);
        }
      });
    })
    .catch(function (error) {
      console.log("Error in GET", error);
    });
}

function createTask(task, notes) {
  $.ajax({
    method: "POST",
    url: "/weekend-to-do-app",
    data: {
      task: task,
      notes: notes,
    },
  })
    .then(function (response) {
      console.log("POST Response", response);
      $("#newTask").val("");
      $("#newNote").val("");
      getTasks();
    })
    .catch(function (error) {
      console.log("POST Error", error);
    });
}

function deleteTask() {
  let taskId = $(this).data().id;
  console.log("DELETE Works");
  $.ajax({
    method: "DELETE",
    url: `/weekend-to-do-app/${taskId}`,
  })
    .then(function (response) {
      console.log("Deleted", response);
      getTasks();
    })
    .catch(function (error) {
      console.log("Delete Error", error);
    });
}

function completeTask() {
  let taskId = $(this).data().id;
  console.log("Complete button works");
  $.ajax({
    method: "PUT",
    url: `/weekend-to-do-app/${taskId}`,
  })
    .then(function (response) {
      console.log("Complete", response);
      getTasks();
    })
    .catch(function (error) {
      console.log("PUT error", error);
    });
}
