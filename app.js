//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("incompleteTasks");//ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks


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
    bindTaskEvents(listItem, taskCompleted);
}

const addTaskToTodoList=function(){
    const taskValue = taskInput.value.trim();
    
    if (!taskValue) return;

    addTaskAndTaskEvent(taskValue);
    taskInput.value="";
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

const editButtonClickEvent = function(){
    const listItem = this.parentNode;
    const taskIsInEditMode = listItem.classList.contains("editMode");
    
    if(taskIsInEditMode){
        finishEditingTask(editableInputParameters(listItem));
    }else{
        startEditingTask(editableInputParameters(listItem));
    }

    listItem.classList.toggle("editMode");
};


//Delete task.
var deleteTask=function(){
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

const bindTaskEventToEditButton = function(taskListItem){
    const editButton = taskListItem.querySelector("button.edit");
    editButton.onclick = editButtonClickEvent;
}
const bindTaskEventToDeleteButton = function(taskListItem){
    const deleteButton = taskListItem.querySelector("button.delete");
    deleteButton.onclick = deleteTask;
}
const bindTaskEventToCheckBox = function(taskListItem,checkBoxEventHandler){
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    checkBox.onchange = checkBoxEventHandler;
}
const bindTaskEvents = function(taskListItem,checkBoxEventHandler){
    bindTaskEventToEditButton(taskListItem);
    bindTaskEventToDeleteButton(taskListItem);
    bindTaskEventToCheckBox(taskListItem,checkBoxEventHandler)
}


const bindEventsToIncompleteTaskElements = function(){
    [...incompleteTaskHolder.children].forEach(child => {
        bindTaskEvents(child,taskCompleted);
    });
}

const bindEventsToCompleteTaskElements = function(){
    [...completedTasksHolder.children].forEach(child => {
        bindTaskEvents(child,taskIncomplete);
    });
}

const bindEventsToTasks = function(){
    bindEventsToIncompleteTaskElements();
    bindEventsToCompleteTaskElements();
}


addButton.addEventListener("click", () =>{
    addTaskToTodoList();
    ajaxRequest();
});
bindEventsToTasks();
// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.