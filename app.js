//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("incomplete");//ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed");//completed-tasks


const createNewTaskElement=function(taskString){

    const listItem=document.createElement("li");
    const elements = {
        checkBox: '<input type="checkbox">',
        label: `<label class="task">${taskString}</label>`,
        editInput: '<input type="text" class="task">',
        editButton: '<button class="edit">Edit</button>',
        deleteButton: '<button class="delete"><img src="./remove.svg" alt="Delete"></button>'
    };

    listItem.innerHTML = Object.values(elements).join('');
    return listItem;
}

const addTaskAndTaskEvent = function(taskValue){
    const listItem = createNewTaskElement(taskValue);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, setTaskCompleted);
}

const addTaskToTodoList=function(){
    const taskValue = taskInput.value.trim();
    if (!taskValue) return false;

    addTaskAndTaskEvent(taskValue);
    taskInput.value="";
    return true;
}

const finishEditingTask = function(param){
    param.label.innerText = param.editInput.value;
    param.editBtn.innerText ="Edit";
}
const startEditingTask = function(param){
    param.editInput.value = param.label.innerText;
    param.editBtn.innerText ="Save";
}
const editableInputParameters = function(listItem){
    const parameters = {
        editInput : listItem.querySelector('input[type=text]'),
        label : listItem.querySelector("label"),
        editBtn : listItem.querySelector(".edit")
    }
    return parameters;
}
const toggleInputEditMode = function(listItem){
    listItem.classList.toggle("edit-mode");
}
const handleEditTaskEvent = function(listItem){

    const taskIsInEditMode = listItem.classList.contains("edit-mode");
    
    if(taskIsInEditMode){
        finishEditingTask(editableInputParameters(listItem));
    }else{
        startEditingTask(editableInputParameters(listItem));
    }
};


var handleDeleteTaskEvent = function(listItem){
    listItem.parentNode.removeChild(listItem);
}


var setTaskCompleted = function(listItem){
    completedTasksHolder.appendChild(listItem);
    bindTaskCheckBoxEvent(listItem, setTaskIncomplete);
}


const setTaskIncomplete = function(listItem){
    incompleteTaskHolder.appendChild(listItem);
    bindTaskCheckBoxEvent(listItem,setTaskCompleted);
}

var ajaxRequest = function(){
    console.log("AJAX Request");
}

const bindEditTaskEvent = function(taskListItem){
    const editButton = taskListItem.querySelector("button.edit");
    editButton.addEventListener('click', () =>{
        handleEditTaskEvent(taskListItem);
        toggleInputEditMode(taskListItem);
    });
}
const bindDeleteTaskEvent = function(taskListItem){
    const deleteButton = taskListItem.querySelector("button.delete");
    deleteButton.addEventListener('click', () => {
        handleDeleteTaskEvent(taskListItem)
    });
}
const bindTaskCheckBoxEvent = function(taskListItem,checkBoxEventHandler){
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    checkBox.addEventListener('change', () => {
        checkBoxEventHandler(taskListItem);
    })
}
const bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    bindEditTaskEvent(taskListItem);
    bindDeleteTaskEvent(taskListItem);
    bindTaskCheckBoxEvent(taskListItem,checkBoxEventHandler)
}


const bindEventsToAllIncompleteTaskElements = function(){
    [...incompleteTaskHolder.children].forEach(child => {
        bindTaskEvents(child,setTaskCompleted);
    });
}

const bindEventsToAllCompleteTaskElements = function(){
    [...completedTasksHolder.children].forEach(child => {
        bindTaskEvents(child,setTaskIncomplete);
    });
}

const bindEventsToTasks = function(){
    bindEventsToAllIncompleteTaskElements();
    bindEventsToAllCompleteTaskElements();
}
const addButtonClickEvent = function(){
    addButton.addEventListener("click", () =>{
        const addedTask = addTaskToTodoList();
        if(addedTask) ajaxRequest();
    });
}
const initiateEventListeners = function(){
    addButtonClickEvent();
}

const setupEnvironment = function(){
    initiateEventListeners();
    bindEventsToTasks();
}

setupEnvironment();
// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.