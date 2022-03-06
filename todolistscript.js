const todoListArray = [];
const todoDiv = document.querySelector("#todoDiv");

//function that handles the submit button after entering the task name and deadline date
const addTaskClicked = () => {
  const taskTitle = document.querySelector("#taskTitle").value.trim();
  const deadLineDate = document.querySelector("#deadLineDate").value.trim();
  if (taskTitle === "") {
    console.log("name is empty");
  } else if (deadLineDate === "") {
    console.log("date is empty");
  } else {
    const daysRemaining = daysCounter(deadLineDate);
    // console.log(daysRemaining + " is the remaining days");
    const newTask = taskFactory(taskTitle, deadLineDate, daysRemaining);
    // console.log(typeof deadLineDate);
    todoListArray.push(newTask);

    const individualTaskDiv = document.createElement("div");
    //conditions for alert color here
    console.log(daysRemaining + " is days remainign snowing?");
    if(daysRemaining < 3) {
        individualTaskDiv.setAttribute("class", "alert alert-danger alert-dismissible fade show col-sm-3");
    } else if (daysRemaining < 7) {
        individualTaskDiv.setAttribute("class", "alert alert-warning alert-dismissible fade show col-sm-3");
    } else {
        individualTaskDiv.setAttribute("class", "alert alert-secondary alert-dismissible fade show col-sm-3");
    }
    individualTaskDiv.setAttribute("role", "alert");
    individualTaskDiv.style.width = "fit-content";
    const closeButton = document.createElement("BUTTON");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "alert");
    closeButton.setAttribute("aria-label", "Close");
    const buttonSpan = document.createElement("SPAN");
    buttonSpan.setAttribute("aria-hidden", "true");
    buttonSpan.innerHTML = "x";
    closeButton.appendChild(buttonSpan);
    individualTaskDiv.appendChild(closeButton);
    todoDiv.appendChild(individualTaskDiv);
    const taskParagraph = document.createElement("p");
    individualTaskDiv.appendChild(taskParagraph);
    taskParagraph.innerHTML = newTask.taskTitle;
    const dateParagraph = document.createElement("p");
    individualTaskDiv.appendChild(dateParagraph);
    dateParagraph.innerHTML = newTask.deadLineDate;
    const daysRemainingParagraph = document.createElement("p");
    individualTaskDiv.appendChild(daysRemainingParagraph);
    daysRemainingParagraph.innerHTML = newTask.daysRemaining;
  }
};

//factory function to create todo objects
const taskFactory = (taskTitle, deadLineDate, daysRemaining) => {
  console.log(taskTitle + " is title " + deadLineDate + " date");
  console.log(todoListArray);
  return {
    taskTitle: taskTitle,
    deadLineDate: deadLineDate,
    daysRemaining: daysRemaining
  };
};

const daysCounter = (deadLineDate) => {
    let todaysDateWithTime = new Date(); 
	let todaysDateWithoutTime = todaysDateWithTime.getFullYear()+'-'+(todaysDateWithTime.getMonth()+1)+'-'+todaysDateWithTime.getDate();
    // console.log(todaysDateWithoutTime+" todays date is ");
    // console.log(deadLineDate + " deadline date is ");
    let diff = Math.floor((Date.parse(deadLineDate) - Date.parse(todaysDateWithoutTime)) / 86400000);
    return diff;
};

