(function(){
let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


async function fetchTodos(){
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(Response => Response.json())
    // .then((data)=>{
    //     tasks = data.slice(0,10);
    //     renderList();
    // })
    // .catch(error => console.log(error));
    try{
        const responce = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data =  await responce.json();
        tasks=data.slice(0,10);
        renderList();
    }catch(error){
        console.log(error);
    }
}


function addTaskToDom(task){
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.completed ? "checked": ""} class="custom-checkbox"/>
    <label for="${task.id}">${task.title}</label>
    <img src="bin_svg/ios-bin-150.png" class="delete" data-id="${task.id}" />
    `;

    taskList.append(li);
}

function renderList(){
    taskList.innerHTML='';
    for(var i of tasks){
        addTaskToDom(i);
    }
    tasksCounter.innerHTML = tasks.length;
};

function toggleTask(taskID){
     const task = tasks.filter( task => task.id === Number(taskID));
     if(task.length>0){
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification("Task toggeled sucessfully!");
        return;
     }
     showNotification("could not toggel the task!");
};

function deleteTask(taskID){
    const newTasks = tasks.filter( function (task){ 
        return task.id != taskID;
    });
    // tasks= tasks.filter(task => task.id != taskID);
    tasks= newTasks;
    renderList();
    showNotification("Task is deleted!");
};

function addTask(task){
    
    //  if(task){
    //     fetch('https://jsonplaceholder.typicode.com/todos',{
    //         method:'POST',
    //         headers:{
    //             'content':'application/json'
    //         },
    //         body:JSON.stringify(task)
    //     })
    //     .then(Response => Response.json())
    //     .then((data)=>{
    //         console.log(data);
    //         tasks.push(data);
    //         renderList();
    //         showNotification('Task added successfully');
    //     })
    //     .catch(error => console.log(error));
    //  }

    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task can not be added');
};

function showNotification(text){
    alert(text);
}

function handleInputKeyPress(e){
    if(e.key==='Enter'){
        const text = e.target.value;
        if(!text){
            showNotification('task text can not be empty');
            return;
        }

        const task = {
            title:text,
            id: data.now(),
            completed: false
        }
        e.target.value="";
        addTask(task);
    }
};

function handleClick(e){
    const target = e.target;
    console.log(target);
    if(target.className === "delete"){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className === "custom-checkbox"){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup',handleInputKeyPress);
    document.addEventListener('click',handleClick);
    fetchTodos();
}

initializeApp();
})();
