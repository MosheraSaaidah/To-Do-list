///Read on Cred
//this Data is Static
let tasks = [
  {
    title: "انهاء المشروع",
    date: "15/10/2030",
    isDone: false,
  },
];

/// Get local Storage
function getTaskFromStorage() {
  let anyName = JSON.parse(localStorage.getItem("tasks"));
  tasks = anyName ?? [];
}
getTaskFromStorage();

//Start Fun FillTask:
function fillTask() {
  document.getElementById("tasks").innerHTML = "";
  let valu = 0;
  //Begin For of loop
  for (task of tasks) {
    let demo = `
          <div class="task ${task.isDone ? "done" : ""}">
          <div class="task-info">
          <div>
            <h2 id="t-info">${task.title} </h2>
          </div>
          <span>${task.date}</span>
          </div>
          <div class="task-action">
          <button onclick= "deleteTask(${valu})"  class="shape btn-delete ">
            <span class="material-symbols-outlined">
                delete
            </span>
          </button>
          <button onclick= "editTask(${valu})" class="shape btn-edit "><span class="material-symbols-outlined">
                auto_fix
            </span>
            </button>
          <button  onclick= "toggleTask(${valu})" class="shape btn-insert"> 
          <span class="material-symbols-outlined">
                done_outline
            </span>
          </button>
          </div>
          </div>`;

    document.getElementById("tasks").innerHTML += demo;
    valu++;
  } //End for of loop
} //End Fun FillTask();
fillTask();
//   Add  Element :
let taskName;
document.getElementById("add-btn").addEventListener("click", function () {
  let sweetAlert = swal({
    text: "يرضى عليك أدخل المهمة وأنجزها طيب !!",
    content: "input",
    button: {
      text: "متأكد ؟؟",
      closeModal: true,
    },
  }).then((value) => {
    taskName = value;

    let now = new Date();
    let date =
      now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
    let taskInfo = {
      title: taskName,
      date: date,
      isDone: false,
    };
    if (value != "" && value !== null) {
      tasks.push(taskInfo);
      storeTask();
      fillTask();
    }
  });
});
// End Addetion
// // Delete Task
function deleteTask(valu) {
  let task = tasks[valu];
  swal({
    title: "هل أنت متأكد من حذف مهمه " + task.title + "؟؟",
    buttons: true,
  }).then((value) => {
    let isYes = value;
    if (isYes == true) {
      tasks.splice(valu, 1);
      storeTask();
      fillTask();
    }
  });
}
//End function

//// Edit Task

function editTask(valu) {
  let task = tasks[valu];
  let sweetAlert = swal({
    text: "هل تريد تعديل مهمة" + " " + task.title + " حقاً !!",
    content: {
      element: "input",
      attributes: {
        value: task.title,
      },
    },
    button: {
      text: "تم ",
      closeModal: true,
    },
  }).then((value) => {
    let newTitle = value;
    if (value != "" && value !== null) {
      task.title = newTitle;
      storeTask();
      fillTask();
    }
  });
}
function toggleTask(valu) {
  let task = tasks[valu];
  task.isDone = !task.isDone;
  storeTask();
  fillTask();
}
////To Storage Function
function storeTask() {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}
// change Background :
function color(z)
{
let a = getComputedStyle(z);
let b = a.backgroundColor ; 
document.getElementsByTagName("body")[0].style.backgroundColor = b;
}
