// START OF CODE TO OPEN CURRENT ORDER

let orderO = document.querySelector('#cOrderBtn');
let orderModalOverlay = document.querySelector('.cOrderWindow');

orderO.addEventListener('click', function() {  
    //When the button is clicked, open the hidden current order window
    viewList();
    orderModalOverlay.style.transform = 'translateY(12%)';
});

// END OF CODE TO OPEN CURRENT ORDER


// // START OF THE CODE TO CLOSE THE CURRENT ORDER WINDOW

let closeBtn = document.querySelector("#closeBtn");

//function to close the current order window on click of the letter 'X'
closeBtn.addEventListener('click', function() {
    orderModalOverlay.style.transform = 'translateY(200%)';
});

// // END OF THE CODE TO CLOSE THE CURRENT ORDER WINDOW



// global variables are declared

// current order
var order = [];
// overall order
var overallOrder = [];
var total=0;
var loyaltyPnts=0;

// function to add items to current order using the variables passed to the function from html onclick of the button
function addToOrder(id,name,qty,unit_price){
    var orderQty=0;
    var ticketNotAdded=true;

    // checks whether the ticket is already present in the order, if so when added again, the quantity increases
    // the forEach loop has been used to execute the function on each element present in the array

    order.forEach(item => {
        if(item.id==id){
            //parseInt is used to parse the parameter as an integer
            item.qty+=parseInt(qty);
            ticketNotAdded=false;
        }
        orderQty+=item.qty;
    });

    //stores the tickets added to the current order as key value pairs in the array
    if(ticketNotAdded){
        order[order.length]={
            "id":id,
            "name":name,
            "qty": parseInt(qty),
            "unit_price": unit_price,
            "item_total":parseInt(qty)*unit_price
        };
        orderQty+=parseInt(qty);
    }
    // calls the other funtions in order to update them on change of this function
    vieworderQty();
    viewList();
    orderTotal();
}


// to display the current order  
function viewList(){

    // to display the output of the current order as a table for the user.
    var outPut=
    '<table class="ticketTable"><tr class="hideRow"><th scope="col" class="removeBorder"><span class="mob">Name</span></th><th scope="col" class="removeBorder"><span class="mob">Qty</span></th><th scope="col" class="removeBorder"><span class="mob">UnitPrice</span></th><th scope="col" class="removeBorder"><span class="mob">Ticket Total</span></th><th scope="col" class="removeBorder"><span class="mob"></span></th></tr>';

    //the forEach is used to add the tickets to the current order
    var orderTotal=0;
    if(order!=null){
    order.forEach(ticket => {
        outPut+='<tr><td data-label="Name">'+ticket.name+'</td><td data-label="Qty"><input class="input-Qty" type="number" min="1" value="'+ticket.qty+'" onchange="changeQty('+ticket.id+',this.value)"></input></td><td data-label="Unit Price">LKR '+ticket.unit_price+'</td><td data-label="Unit Total">LKR '+(ticket.qty*ticket.unit_price)+'</td><td> <button id="remove" onclick="deleteTicket('+ticket.id+')">Remove</button></td></tr>';
    });
    //this is outside the loop to display the total only at the end of the order
    outPut +='<div><td></td><td></td><th scope="col" class="removeBorder"><span class="mob">Total</span></th><td data-label="Total">LKR '+total+'</td><td></td></div></table>';
    }
    // to display the current order table in the current order in the popup window
    document.getElementById("cTktRows").innerHTML  = outPut;
    
}

// to calculate the total of the current order
function orderTotal(){
    // initially the total is set to 0 and the total increases based on the quantity and unit price of the tickets in the current order
    
    total=0;
    if(order!=null){
    order.forEach(item => {
        total+=item.qty*item.unit_price;
    });
    }
}


// to change the quantity of the tickets added to the current order
function changeQty(id,qty){
    orderQty=0;
    order.forEach(item => {
        if(item.id==id){
            item.qty=parseInt(qty);
        }
        orderQty+=item.qty;
    });
    vieworderQty();
    orderTotal();
    viewList();
}

//displays the quantity of the current order ontop of the current oreder button
function vieworderQty(){
    var orderQty=0;
    if(order!=null){
    order.forEach(item => {
        orderQty+=item.qty;
    });
    }
    document.getElementsByClassName('cOrderQuant')[0].textContent = orderQty ;
}

// to remove a ticket from the current order, checks the id of the ticket and splices the ticket based on its index 
function deleteTicket(id){
    var orderQty=0;
    order.forEach(item => {
        orderQty+=item.qty;
        if(item.id==id){
            orderQty-=item.qty;
            order.splice(order.indexOf(item), 1);
        }
    });
    vieworderQty();
    orderTotal();
    viewList();
}

// to display the overall order based on the current order 
function newList(){
    // to display the output of the overall order as a table for the user.

    var outPut='<table class="ticketTable"><tr class="hideRow"><th scope="col" class="removeBorder"><span class="mob">Name</span></th><th scope="col" class="removeBorder"><span class="mob">Qty</span></th><th scope="col" class="removeBorder"><span class="mob">UnitPrice</span></th><th scope="col" class="removeBorder"><span class="mob">Ticket Total</span></th></tr>';
    order.forEach(ticket => {
        outPut+='<tr><td data-label="Name">'+ticket.name+'</td><td data-label="Qty">'+ticket.qty+'</td><td data-label="Unit Price">LKR '+ticket.unit_price+'</td><td data-label="Unit Total">LKR '+(ticket.unit_price*ticket.qty)+'</td></tr>';
    });
    outPut +='<div><td></td><td></td><th scope="col" class="removeBorder"><span class="mob">Total</span></th><td data-label="Total">LKR '+total+'</td></div></table>';

    // to display the current order table in the overall order 
    document.getElementById("newList").innerHTML  = outPut;
    overallOrder = order;
    order=[];
    vieworderQty();
    orderTotal();
    viewList();
    //clears the current order
    
    alert("Successfully added your current order to the overall order !");
}


// to favourite/set the current order to the local storage
function save(){
    // changes the order to a string array and then saves it in the local storage
    localStorage.setItem("Favourite-Order", JSON.stringify(order));
    localStorage.setItem("Favourite-Order-Total",total);

    alert("Successfully added your current order to favourites order !");
}

// to order the favourite(retrieve)/get the favourite order from the local storage 
function loadFav(){
    order = JSON.parse(localStorage.getItem("Favourite-Order"));
    if(order==null){
        alert("No favourite orders!");
    }
    orderTotal();
    vieworderQty()
    viewList();
    if(order!=null){
    alert("Successfully added your favourite order to the current order !");
    }
}    



// START OF CODE TO PURCHASE BUTTON IN OVERALL ORDER

let purchaseBtn = document.querySelector('.purchase-btn');

purchaseBtn.addEventListener('click', purchaseBtnClicked);

function purchaseBtnClicked() {
    alert('Thank you for your purchase');
    // itemQuant=0;
        loyaltyPnts=localStorage.getItem("Loyalty-Points");

        if(isNaN(loyaltyPnts) || loyaltyPnts==null) {
            loyaltyPnts = 0;
        }

        if(overallOrder.length>3){
            loyaltyPnts=parseInt(loyaltyPnts)+parseInt(overallOrder.length)*20;
        }
        localStorage.setItem("Loyalty-Points", loyaltyPnts);
        
        //clears the array and the overall order
        overallOrder=[];
        total=0;
        document.getElementById('newList').innerHTML = '';
}

// END OF CODE TO PURCHASE BUTTON IN OVERALL ORDER


// START OF CODE TO CHECK LOYALTY POINTS

let loyaltyBtn = document.querySelector('.loyaltyPnts-btn');

loyaltyBtn.addEventListener('click', loyaltyClicked);

function loyaltyClicked() {
    loyaltyPnts = localStorage.getItem("Loyalty-Points");
    if(isNaN(loyaltyPnts) || loyaltyPnts==null) {
        loyaltyPnts = 0;
    }
    alert("The total loyalty points you have earned are "+loyaltyPnts);
}

// END OF CODE TO CHECK LOYALTY POINTS




// Donations Section Start


var defImg = document.getElementById('defaultImg');
var cardType= document.getElementById('cardType');
//used to change the image of the cart type based on the index of the child type and changes the url 
function cardImage() {
    defImg.src = cardType.children[cardType.selectedIndex].getAttribute('url');
    
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("donate-Btn1");
 


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function(event) {
  let ddL1 = document.forms["donationForm"]["dropDownList-1"].value;
  let ddL2 = document.forms["donationForm"]["cardType"].value;
  let fName = document.forms["donationForm"]["txtFName"].value;
  let LName = document.forms["donationForm"]["txtLName"].value;
  let numPhone = document.forms["donationForm"]["numPhone"].value;
  let addDntTxt = document.forms["donationForm"]["addDntTxt"].value;
  let cardType = document.forms["donationForm"]["cardType"].value;
  let ccNum = document.forms["donationForm"]["ccNum"].value;
  let expD1 = document.forms["donationForm"]["expD1"].value;
  let expD2 = document.forms["donationForm"]["expD2"].value;
  let cvc = document.forms["donationForm"]["cvc"].value;
  let ccName = document.forms["donationForm"]["ccName"].value;

  //if condition is used to only display the confirmation popup if all the fields are not empty this is done based on value taken from above
  if(ddL1 != "" &&
    ddL2 != "" &&
    fName != "" && 
    LName != "" && 
    numPhone != "" && 
    addDntTxt != "" && 
    cardType != "" && 
    ccNum != "" && 
    expD1 != "" && 
    expD2 != "" && 
    cvc != ""&& 
    ccName != "" ){
    modal.style.display = "block";
    //to prevent the default event of the method of the form to happening 
    event.preventDefault();
    resetForm();
    }
}

function resetForm(){
    // resets all the values to  empty once donated
    document.getElementById("defaultImg").value = "";
    document.getElementById("dropDownList-1").value = "";
    document.getElementById("cardType").value = "";
    document.getElementById("txtFName").value = "";
    document.getElementById("txtLName").value = "";
    document.getElementById("numPhone").value = "";
    document.getElementById("addDntTxt").value = "";
    document.getElementById("cardType").value = "";
    document.getElementById("ccNum").value = "";
    document.getElementById("expD1").value = "";
    document.getElementById("expD2").value = "";
    document.getElementById("cvc").value = "";
    document.getElementById("ccName").value = "";
    defImg.src='';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}   