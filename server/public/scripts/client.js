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
  // $(".deleteBtn").on("click", () => {
  //   deleteTask();
  //   });
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
        $("#viewList").append(`
        <tr id="row-${toDo.id}">
        <td>${toDo.task}</td>
        <td>${toDo.notes}</td>
        <td>${toDo.isCompleted}</td>
        <td><button class="isCompletedBtn" data-id='${toDo.id}'>Complete</button></td>
        <td><button class="deleteBtn" data-id='${toDo.id}'>Delete</button></td>
        </tr>
        `);
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
