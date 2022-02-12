

$(document).ready(() => {
  setupClickListeners();
  getTasks();
});

function setupClickListeners() {
  $("#addTaskButton").on("click", () => {
    console.log("Add Task Button Works");
  });
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
        <tr id="${toDo.id}">
        <td>${toDo.task}</td>
        <td>${toDo.notes}</td>
        <td>${toDo.isCompleted}</td>
        <td><button class="isCompletedBtn" id='completed-btn-${toDo.id}'>Complete</button></td>
        <td><button class="deleteBtn" id='delete-btn-${toDo.id}'>Delete</button></td>
        </tr>
        `);
      });
    })
    .catch(function (error) {
      console.log(colors.error("Error in GET"), error);
    });
}
