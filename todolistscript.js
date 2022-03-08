const todoListArray = [];
const todoDiv = document.querySelector("#todoDiv");

//function that handles the submit button after entering the task name and deadline date
const addTaskClicked = () => {
  const taskTitle = document.querySelector("#taskTitle").value.trim();
  const deadLineDate = document.querySelector("#deadLineDate").value.trim();
  const daysRemaining = daysCounter(deadLineDate);
  if (taskTitle === "") {
    //   console.log("name is empty");
    document
      .querySelector("#taskTitle")
      .setCustomValidity("Task title cannot be empty");
  } else if (deadLineDate === "") {
    // console.log("date is empty");
    document
      .querySelector("#deadLineDate")
      .setCustomValidity("Date cannot be empty");
  } else if (daysRemaining < 1) {
    let todaysDateWithTime = new Date();
    todaysDateWithTime.setDate(todaysDateWithTime.getDate() + 1);
    let todaysDateWithoutTime =
      todaysDateWithTime.getFullYear() +
      "-" +
      (todaysDateWithTime.getMonth() + 1) +
      "-" +
      todaysDateWithTime.getDate();
    document
    .querySelector("#deadLineDate")
    .setCustomValidity("Value must be " + todaysDateWithoutTime+  " or later");
  }
   else {
    // document.querySelector("#taskTitle").setCustomValidity("");
    // document.querySelector("#deadLineDate").setCustomValidity("");
    
    // console.log(daysRemaining + " is the remaining days");
    const newTask = taskFactory(taskTitle, deadLineDate, daysRemaining);
    // console.log(typeof deadLineDate);
    todoListArray.push(newTask);

    const individualTaskDiv = document.createElement("div");
    //conditions for alert color here
    console.log(daysRemaining + " is days remainign snowing?");
    if (daysRemaining < 3) {
      individualTaskDiv.setAttribute(
        "class",
        "alert alert-danger alert-dismissible fade show col-sm-auto"
      );
    } else if (daysRemaining < 7) {
      individualTaskDiv.setAttribute(
        "class",
        "alert alert-warning alert-dismissible fade show col-sm-auto"
      );
    } else {
      individualTaskDiv.setAttribute(
        "class",
        "alert alert-secondary alert-dismissible fade show col-sm-auto"
      );
    }
    individualTaskDiv.setAttribute("role", "alert");
    // individualTaskDiv.style.width = "fit-content";
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
    // const dateParagraph = document.createElement("p");
    // individualTaskDiv.appendChild(dateParagraph);
    // dateParagraph.innerHTML = newTask.deadLineDate;
    const daysRemainingParagraph = document.createElement("p");
    individualTaskDiv.appendChild(daysRemainingParagraph);
    daysRemainingParagraph.innerHTML = newTask.daysRemaining;
    document.querySelector("#taskTitle").value = "";
    document.querySelector("#deadLineDate").value = "";
  }
};

//factory function to create todo objects
const taskFactory = (taskTitle, deadLineDate, daysRemaining) => {
  console.log(taskTitle + " is title " + deadLineDate + " date");
  console.log(todoListArray);
  return {
    taskTitle: taskTitle,
    deadLineDate: deadLineDate,
    daysRemaining: daysRemaining,
  };
};

const daysCounter = (deadLineDate) => {
  let todaysDateWithTime = new Date();
  let todaysDateWithoutTime =
    todaysDateWithTime.getFullYear() +
    "-" +
    (todaysDateWithTime.getMonth() + 1) +
    "-" +
    todaysDateWithTime.getDate();
  // console.log(todaysDateWithoutTime+" todays date is ");
  // console.log(deadLineDate + " deadline date is ");
  let diff = Math.floor(
    (Date.parse(deadLineDate) - Date.parse(todaysDateWithoutTime)) / 86400000
  );
  return diff + 1;
};
