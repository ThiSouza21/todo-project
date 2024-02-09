"use strict"

let arrayTaskLi = [];

const formAddTask = document.getElementById("formTask");
const inputAddTask = document.getElementById("inputTaskName"); 
const ulTaskAdd = document.getElementById("ulToTasks");
const setLiTasks = ulTaskAdd.getElementsByClassName("containerLiTask");
const liNotCreated = document.getElementById("notCreatedTask");
const pTaskCreatedCont = document.getElementById("contTasks");
const pTaskConcluidCont = document.getElementById("contConcluid");
const buttonCreatedTaskForForm = document.getElementById("buttonCreateTask");
const alertTextLimite = document.getElementById("alertLimitedText");
const trashAlertLimited = document.getElementById("trashAlertText");
const imageLiCheckedTask = document.querySelector(".imageTaskNotCheck");
const imageLiNotCheckedTask = document.querySelector(".imageTaskCheck");
const inputCheckCompleted = document.getElementsByClassName("inputNotCheckedtask");

inputAddTask.value = "";

function addTaskArrayLi(taskName) {
  arrayTaskLi.push({
    name: taskName,
    completed: false
  });
};

function createLiTask(obj) {
  const liTask = document.createElement("li");
  const divNotCheckTask = document.createElement("div");
  const inputNotCheckTask = document.createElement("input");
  const pNameTask = document.createElement("p");
  const imgTrashTask = document.createElement("img");

  liTask.setAttribute("class", "containerLiTask");
  liTask.setAttribute("data-action", "taskLiSelect");

  divNotCheckTask.setAttribute("class", "divNotCheckedtask");

  inputNotCheckTask.setAttribute("class", "inputNotCheckedtask");
  inputNotCheckTask.setAttribute("type", "checkbox");
  inputNotCheckTask.setAttribute("id", "inputTaskChecked");
  inputNotCheckTask.setAttribute("data-action", "inputCheckCompleted");


  pNameTask.setAttribute("class", "textNameTask");

  imgTrashTask.setAttribute("class", "imageTrash");
  imgTrashTask.setAttribute("data-action", "deleteLi");
  imgTrashTask.setAttribute("src", "./assets/trash-icon.svg");

  pNameTask.textContent = obj.name;

  divNotCheckTask.appendChild(inputNotCheckTask);
  liTask.appendChild(divNotCheckTask);
  liTask.appendChild(pNameTask);
  liTask.appendChild(imgTrashTask);

  liTask.firstChild.firstChild.checked = obj.completed;

  return liTask;
};

function removeElementLi() {
  const arrayLisTasks = Array.from(setLiTasks); 
  for (let i = 0; i < arrayLisTasks.length; i++) {
    ulTaskAdd.removeChild(arrayLisTasks[i]);
  }
};

function renderTaskForLi() {
  removeElementLi();
  arrayTaskLi.forEach((e) => {
    ulTaskAdd.appendChild(createLiTask(e));
  });
};

function addContTaskConcluid() {
  const containerTasksCreatedCont = document.getElementById("createdContTasks");
  let index = 0;
  for (let i = 0; i < Array.from(arrayTaskLi).length; i++) {
    if (arrayTaskLi[i].completed == true) {
      index++;
    } 
  }
  if (Array.from(setLiTasks).length > 0) {
    pTaskConcluidCont.style.display = "flex";
    pTaskConcluidCont.textContent = `${index} de ${Array.from(setLiTasks).length}`;
  } else {
    pTaskConcluidCont.style.display = "none";
  }
};

function addContTaskCreated() {
  const containerTasksCreatedCont = document.getElementById("concluidContTasks");
  if (Array.from(setLiTasks).length > 0) {
    pTaskCreatedCont.style.display = "flex";
    pTaskCreatedCont.textContent = `${Array.from(setLiTasks).length}`;
  } else {
    pTaskCreatedCont.style.display = "none";
  }
};

function removeDivNotCreatedTask() {
  if ([...setLiTasks].length > 0) {
    liNotCreated.style.display = "none";
  } else {
    liNotCreated.style.display = "flex";
  }
};

trashAlertLimited.addEventListener("click", () => {
  alertTextLimite.classList.remove("displayFlexAlertLimite");
  inputAddTask.focus();
});


ulTaskAdd.addEventListener("click", (e) => {
  let elementClickEvent = e.target;
  let dataActionElements = elementClickEvent.getAttribute("data-action"); 
  console.log(elementClickEvent);
  
  while (elementClickEvent.nodeName !== "LI") {
    elementClickEvent = elementClickEvent.parentElement;
  };
  
  let elementClickEventIndex = Array.from(setLiTasks).indexOf(elementClickEvent);
  let liSelected = setLiTasks[elementClickEventIndex];
  console.log(liSelected);
  
  const actions = {
    taskLiSelect: function () {
      if (arrayTaskLi[elementClickEventIndex].completed == false) {
        arrayTaskLi[elementClickEventIndex].completed = true;
        liSelected.firstChild.firstChild.checked = true;
        addContTaskConcluid();
      } else if (arrayTaskLi[elementClickEventIndex].completed == true) {
        arrayTaskLi[elementClickEventIndex].completed = false;
        liSelected.firstChild.firstChild.checked = false;
        addContTaskConcluid();
      }
    },
    inputCheckCompleted: function () {
      if (arrayTaskLi[elementClickEventIndex].completed == false) {
        arrayTaskLi[elementClickEventIndex].completed = true;
        liSelected.firstChild.firstChild.checked = true;
        addContTaskConcluid();
      } else if (arrayTaskLi[elementClickEventIndex].completed == true) {
        arrayTaskLi[elementClickEventIndex].completed = false;
        liSelected.firstChild.firstChild.checked = false;
        addContTaskConcluid();
      }
    },
    deleteLi: function () {
      arrayTaskLi.splice(elementClickEventIndex, 1);
      elementClickEvent.parentElement.removeChild(elementClickEvent);
      addContTaskCreated();
      addContTaskConcluid();
    }
  };
  

  if (actions[dataActionElements]) {
    actions[dataActionElements]();
  } else if (!actions[dataActionElements]) {
    return; 
  };
});


formAddTask.addEventListener("submit", (e) => {
  alertTextLimite.classList.remove("displayFlexAlertLimite");
  if (inputAddTask.value.length > 0) {
    e.preventDefault();
    alertTextLimite.classList.remove("displayFlexAlertLimite");
    addTaskArrayLi(inputAddTask.value);
    renderTaskForLi();
    removeDivNotCreatedTask();
    addContTaskCreated();
    addContTaskConcluid();
    inputAddTask.value = "";
    inputAddTask.focus();
  } else {
    e.preventDefault();
    alertTextLimite.classList.add("displayFlexAlertLimite");
    inputAddTask.focus();
  }
});

addContTaskCreated();
addContTaskConcluid();
renderTaskForLi();

