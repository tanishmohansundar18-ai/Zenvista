let selectedResort = "";
let selectedRoom = "";
let pricePerDay = 0;

function nextScreen(id){
    document.querySelectorAll(".screen").forEach(screen=>{
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function selectResort(resort){
    selectedResort = resort;
    nextScreen("dateScreen");
}

function goToRoomSelection(){

    const arrival = new Date(document.getElementById("arrivalDate").value);
    const departure = new Date(document.getElementById("departureDate").value);

    if(arrival == "Invalid Date" || departure == "Invalid Date"){
        alert("Please select dates");
        return;
    }

    const roomOptions = document.getElementById("roomOptions");

    const beachResorts = ["Maldives","Mauritius","South Africa"];

    if(beachResorts.includes(selectedResort)){

        roomOptions.innerHTML = `
            <div class="room-option">
                <h3>Beach Villa</h3>
                <p>$50 per day</p>
                <button onclick="bookRoom('Beach Villa',50)">Select</button>
            </div>

            <div class="room-option">
                <h3>Water Villa</h3>
                <p>$65 per day</p>
                <button onclick="bookRoom('Water Villa',65)">Select</button>
            </div>
        `;
    }

    else{

        roomOptions.innerHTML = `
            <div class="room-option">
                <h3>Economy</h3>
                <p>$35 per day</p>
                <button onclick="bookRoom('Economy',35)">Select</button>
            </div>

            <div class="room-option">
                <h3>Economy Plus</h3>
                <p>$52 per day</p>
                <button onclick="bookRoom('Economy Plus',52)">Select</button>
            </div>

            <div class="room-option">
                <h3>Suite</h3>
                <p>$70 per day</p>
                <button onclick="bookRoom('Suite',70)">Select</button>
            </div>
        `;
    }

    nextScreen("roomScreen");
}

function bookRoom(room,price){

    selectedRoom = room;
    pricePerDay = price;

    const arrival = new Date(document.getElementById("arrivalDate").value);
    const departure = new Date(document.getElementById("departureDate").value);

    const days = (departure - arrival)/(1000*60*60*24);

    let finalPrice = pricePerDay;

    const today = new Date();

    const oneMonth = 30*24*60*60*1000;

    if(arrival - today < oneMonth){
        finalPrice += finalPrice * 0.15;
    }

    const month = arrival.getMonth();

    if(month == 11){
        finalPrice -= finalPrice * 0.05;
    }

    const total = (finalPrice * days).toFixed(2);

    document.getElementById("receiptResort").innerText = selectedResort;
    document.getElementById("receiptArrival").innerText = arrival.toDateString();
    document.getElementById("receiptDeparture").innerText = departure.toDateString();
    document.getElementById("receiptRoom").innerText = selectedRoom;
    document.getElementById("receiptDays").innerText = days;
    document.getElementById("receiptPrice").innerText = finalPrice.toFixed(2);
    document.getElementById("receiptTotal").innerText = total;

    nextScreen("receiptScreen");
}
