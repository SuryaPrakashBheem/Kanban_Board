let add_btn = document.querySelector(".plus");
let remove_btn = document.querySelector(".remove")
let pop_up = document.querySelector(".modal_box");
let main_cont = document.querySelector(".main_box");
let allPriorityColors = document.querySelectorAll(".colormodal");
let textArea = document.querySelector(".text_area");
let model_color = document.querySelectorAll(".colormodal");
let toolBoxColors=document.querySelectorAll(".color");

let addTaskFlag = false;
let removeTaskFlag = false;
let colors = ["red", "pink", "green", "blue"];
let modalPriorityColor = "red";
let ticketsArr=[]

if(localStorage.getItem('tickets')){
  ticketsArr = JSON.parse(localStorage.getItem('tickets'))

  ticketsArr.forEach(function(ticket){
      createTickets(ticket.ticketTask , ticket.modalPriorityColor , ticket.ticketId )
  })
}

add_btn.addEventListener("click", function () {
  addTaskFlag = !addTaskFlag;
  if (addTaskFlag === true) {
    pop_up.style.display = "flex";
  }
  else {
    pop_up.style.display = "none";
  }
});
pop_up.addEventListener("keydown", function (e) {
  let key = e.key;
  if (key === "Shift") {
    createTickets(textArea.value, modalPriorityColor);
    textArea.value = "";
  };
});

//  Filter Tasks based on toolbox color

for (let i=0; i<toolBoxColors.length; i++){
  toolBoxColors[i].addEventListener("click",function(){
    let selectedToolBoxColor=toolBoxColors[i].classList[0]

    let filteredTickets = ticketsArr.filter(function(ticket){
      return selectedToolBoxColor == ticket.modalPriorityColor
   })
    let allTickets = document.querySelectorAll('.Ticket1')
    for(let i=0 ; i<allTickets.length ; i++){
        allTickets[i].remove()
    }
    filteredTickets.forEach(function(filteredTicket){
      createTickets(filteredTicket.ticketTask,filteredTicket.modalPriorityColor,  filteredTicket.ticketId);


  })
  
  })
}

//creating Tickets
function createTickets(ticketTask, modalPriorityColor,ticketId) {
  let id =ticketId|| shortid()
  let ticket = document.createElement("div");
  ticket.setAttribute("class", "Ticket1");
  ticket.innerHTML = `
  <div class="priority_color ${modalPriorityColor}"></div>
  <div class="token_id">${id}</div>
  <div class="workToBeDone">${ticketTask}</div>`;
  //<div class="lock"><i class="fa-solid fa-lock"></i></div>`;
  main_cont.appendChild(ticket);
  pop_up.style.display = "none";
  removeTickets(ticket);
  handleTicketColor(ticket);
  if (!ticketId){
  ticketsArr.push({ticketTask,modalPriorityColor,ticketId:id});
  localStorage.setItem("tickets",JSON.stringify(ticketsArr))
  }
  // console.log(ticketsArr);
  // let ticketTaskArea=document.querySelector(".workToBeDone");
  // ticketTaskArea.setAttribute("contenteditable","true");

};
allPriorityColors.forEach(function (color) {
  color.addEventListener("click", function () {
    allPriorityColors.forEach(function (priority_color) {
      priority_color.classList.remove("active");
    });
   // console.log(color.classList[0])
    color.classList.add("active");
    modalPriorityColor = color.classList[0];
  });
});
//removal of Tickets
remove_btn.addEventListener("click", function () {
  removeTaskFlag = !removeTaskFlag;
  if (removeTaskFlag == true) {
    alert("Delete button is Active");
    remove_btn.style.color = "Red";
  }
  else {
    alert("Delete button is Inactive");
    remove_btn.style.color = "Black";
  }
})
//handling ticket removal
function removeTickets(ticket,id) {
  ticket.addEventListener("click", function () {
    if (!removeTaskFlag) return
    let idx=getIdx(id);
    ticket.remove();
    ticketsArr.splice(idx, 1);
    localStorage.setItem('tickets' , JSON.stringify(ticketsArr));
  });
}
//handling change of ticket color
function handleTicketColor(ticket){
  let ticketColorBand=ticket.querySelector(".priority_color");

  ticketColorBand.addEventListener("click",function(){
    let ticketIdx=getIdx(id)
    let currentColor=ticketColorBand.classList[1];
  
    let currentColorIdx=colors.findIndex(function(color){
          return currentColor===color;
    });
     currentColorIdx++;

     let newTicketcolorIdx=currentColorIdx % colors.length;
     let newTicketcolorvalue=colors[newTicketcolorIdx];


     ticketColorBand.classList.remove(currentColor);
     ticketColorBand.classList.add(newTicketcolorvalue);

     ticketsArr[ticketIdx].ticketColorClass = newTicketcolorvalue
     localStorage.setItem('tickets' , JSON.stringify(ticketsArr))
     
  })
}
function getIdx(id){
  let ticketIdx = ticketsArr.findIndex(function(ticketObj){
     return ticketObj.ticketID === id
  })

  return ticketIdx
}
