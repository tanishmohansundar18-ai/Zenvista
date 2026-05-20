let selectedResort = "";
let peopleCount = 1;

const beachResorts = [
    "Maldives",
    "Mauritius",
    "South Africa"
];

function nextScreen(id){

    document.querySelectorAll(".screen")
    .forEach(screen=>{

        screen.classList.remove("active");

    });

    document.getElementById(id)
    .classList.add("active");

    updateBackground(id);
}

function updateBackground(id){

    const screen =
    document.getElementById(id);

    screen.classList.remove("city-bg");
    screen.classList.remove("beach-bg");

    if(
        beachResorts.includes(selectedResort)
    ){

        screen.classList.add("beach-bg");
    }

    else{

        screen.classList.add("city-bg");
    }
}

function selectResort(resort){

    selectedResort = resort;

    nextScreen("dateScreen");
}

function goToPeopleScreen(){

    const arrival =
    document.getElementById("arrivalDate").value;

    const departure =
    document.getElementById("departureDate").value;

    if(arrival == "" || departure == ""){

        alert("Please select dates");

        return;
    }

    nextScreen("peopleScreen");
}

function goToRoomSelection(){

    peopleCount =
    parseInt(
    document.getElementById("peopleCount").value
    );

    if(
        isNaN(peopleCount)
        ||
        peopleCount <= 0
    ){

        alert("Please enter valid guests");

        return;
    }

    const roomOptions =
    document.getElementById("roomOptions");

    if(
        beachResorts.includes(selectedResort)
    ){

        roomOptions.innerHTML = `

        <div class="room-option">

            <h3>Beach Villa</h3>

            <p>$85 Per Day</p>

            <input
            type="number"
            id="beachDays"
            placeholder="How many days?">

        </div>

        <div class="room-option">

            <h3>Water Villa</h3>

            <p>$110 Per Day</p>

            <input
            type="number"
            id="waterDays"
            placeholder="How many days?">

        </div>

        <button onclick="bookBeachRooms()">

            Continue

        </button>

        `;
    }

    else{

        roomOptions.innerHTML = `

        <div class="room-option">

            <h3>Economy</h3>

            <p>$60 Per Day</p>

            <button onclick="bookCityRoom(
            'Economy',
            60
            )">

                Select

            </button>

        </div>

        <div class="room-option">

            <h3>Economy Plus</h3>

            <p>$75 Per Day</p>

            <button onclick="bookCityRoom(
            'Economy Plus',
            75
            )">

                Select

            </button>

        </div>

        <div class="room-option">

            <h3>Suite</h3>

            <p>$100 Per Day</p>

            <button onclick="bookCityRoom(
            'Suite',
            100
            )">

                Select

            </button>

        </div>

        `;
    }

    nextScreen("roomScreen");
}

function calculateDays(){

    const arrival =
    new Date(
    document.getElementById("arrivalDate").value
    );

    const departure =
    new Date(
    document.getElementById("departureDate").value
    );

    return (
        departure - arrival
    ) / (1000*60*60*24);
}

function applyPriceChanges(total){

    const arrival =
    new Date(
    document.getElementById("arrivalDate").value
    );

    const today = new Date();

    const oneMonth =
    30*24*60*60*1000;

    if(arrival - today < oneMonth){

        total += total * 0.15;
    }

    const month =
    arrival.getMonth();

    if(month == 11){

        total -= total * 0.05;
    }

    return total;
}

function bookBeachRooms(){

    const beachDays =
    parseInt(
    document.getElementById("beachDays").value
    ) || 0;

    const waterDays =
    parseInt(
    document.getElementById("waterDays").value
    ) || 0;

    const totalDays =
    calculateDays();

    if(
        beachDays + waterDays
        !=
        totalDays
    ){

        alert(
        "Villa days must equal total stay days"
        );

        return;
    }

    let roomCost =
    (beachDays * 85)
    +
    (waterDays * 110);

    roomCost =
    applyPriceChanges(roomCost);

    finishBooking(
        roomCost,
        "Beach Villa + Water Villa"
    );
}

function bookCityRoom(roomName,price){

    const totalDays =
    calculateDays();

    let roomCost =
    totalDays * price;

    roomCost =
    applyPriceChanges(roomCost);

    finishBooking(
        roomCost,
        roomName
    );
}

function finishBooking(roomCost,roomName){

    const totalDays =
    calculateDays();

    const peopleCharges =
    peopleCount * 30 * totalDays;

    const extraCharges =
    15 * totalDays;

    const subtotal =
    roomCost +
    peopleCharges +
    extraCharges;

    const gst =
    subtotal * 0.10;

    const finalTotal =
    subtotal + gst;

    document.getElementById("receiptResort")
    .innerText = selectedResort;

    document.getElementById("receiptArrival")
    .innerText =
    document.getElementById("arrivalDate").value;

    document.getElementById("receiptDeparture")
    .innerText =
    document.getElementById("departureDate").value;

    document.getElementById("receiptPeople")
    .innerText = peopleCount;

    document.getElementById("receiptRoom")
    .innerText = roomName;

    document.getElementById("receiptDays")
    .innerText = totalDays;

    document.getElementById("receiptExtra")
    .innerText =
    extraCharges.toFixed(2);

    document.getElementById("receiptGST")
    .innerText =
    gst.toFixed(2);

    document.getElementById("receiptTotal")
    .innerText =
    finalTotal.toFixed(2);

    nextScreen("foodScreen");
}

function showReceipt(){

    nextScreen("receiptScreen");
}
