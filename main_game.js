class Ship {
    constructor(name, capacity, planet) {
        this.name = name;
        this.capacity = capacity;
        this.planet = planet;
        this.commodities = new Map();
        this.commodities.set("Cynamon", 0);
        this.commodities.set("Dwimeryt", 0);
        this.commodities.set("Nuka-Cola", 0);
        this.commodities.set("Złoto", 0);
        this.commodities.set("Unobtanium", 0);
        this.commodities.set("Proteańskie dyski", 0);
        this.commodities.set("Ziemniaki", 0);
        this.commodities.set("Lyrium", 0);
        this.commodities.set("Murkwie", 0);
        this.commodities.set("Woda", 0);
        this.isOnPlanet = true;
        this.freeCapacity = capacity;
    }
}
let ship1 = new Ship("Axiom", 27, "Tatooine");
let ship2 = new Ship("Enterprise", 46, "Corellia");
let ship3 = new Ship("Goliath", 33, "Sur'Kesh");
let ship4 = new Ship("Hermes", 26, "NowWhat");
let ship5 = new Ship("Millenium Falcon", 35, "Tatooine");
let ship6 = new Ship("Niezwyciężony", 60, "Argoland");
let ship7 = new Ship("Normandy SR-2", 40, "Gaia");
let ship8 = new Ship("Nostromo", 25, "Arrakis");
let ship9 = new Ship("Rocinante", 30, "Alderaan");
let ship10 = new Ship("Космонавт Алексе́й Лео́нов", 35, "Arrakis");
class Planet {
    constructor(name) {
        this.name = name;
        this.commodities = new Map();
        this.ask = new Map();
        this.bid = new Map();
    }
}
class Player {
    constructor(n, s) {
        this.n = n;
        this.s = s;
        this.name = n;
        this.score = s;
    }
}
let planets = new Map();
let remainingTime = 300;
let nickname2 = localStorage.getItem("nickname");
let balance = 1000;
let ships = new Map();
ships.set("Axiom", ship1);
ships.set("Enterprise", ship2);
ships.set("Goliath", ship3);
ships.set("Hermes", ship4);
ships.set("Millenium Falcon", ship5);
ships.set("Niezwyciężony", ship6);
ships.set("Normandy SR-2", ship7);
ships.set("Nostromo", ship8);
ships.set("Rocinante", ship9);
ships.set("Космонавт Алексе́й Лео́нов", ship10);
document.getElementById("game_bar").innerHTML = '<div>' + nickname2 + '</div><div>Balance: ' + balance
    + '</div><div>Remaining time: ' + remainingTime.toString() + '</div>';
setInterval(function () {
    remainingTime--;
    document.getElementById("game_bar").innerHTML = '<div>' + nickname2 + '</div><div>Balance: ' + balance
        + '</div><div>Remaining time: ' + remainingTime.toString() + '</div>';
    if (remainingTime == 0) {
        // Game over.
        endGame();
    }
    showShips();
}, 1000);
function updateBalance(newBalance) {
    balance = newBalance;
    document.getElementById("game_bar").innerHTML = '<div>' + nickname2 + '</div><div>Balance: ' + balance
        + '</div><div>Remaining time: ' + remainingTime.toString() + '</div>';
}
function endGame() {
    window.location.href = 'index.html';
    let player = new Player(nickname2, balance);
    let players = [];
    if (localStorage.getItem("leaderboard") != null) {
        console.log("leaderboard exists");
        // Get array from localStorage if it exists.
        players = JSON.parse(localStorage.getItem("leaderboard"));
    }
    players.push(player);
    localStorage.setItem("leaderboard", JSON.stringify(players));
    alert("Twój wynik: " + balance);
}
function showShipPopup(ship) {
    if (ships.get(ship).isOnPlanet) {
        showShipOnPlanet(ship);
    }
    else {
        showShipDuringJourney(ship);
    }
}
function showShipOnPlanet(ship) {
    console.log("on planet " + ship);
    document.getElementById("ship_name_on_planet").innerText = ship;
    let shipLocation = ships.get(ship).planet;
    document.getElementById("ship_location").innerText = "Location: " + shipLocation;
    document.getElementById("free_capacity").innerText = "Free space on ship: " + ships.get(ship).freeCapacity;
    let planetsToTravel = document.getElementById("planet_to_travel");
    planetsToTravel.innerHTML = "";
    planets.forEach((planet, planetName) => {
        if (ships.get(ship).planet != planetName) {
            let option = document.createElement("option");
            option.text = planetName;
            planetsToTravel.add(option);
        }
    });
    let commodityToBuy = document.getElementById("commodity_to_buy");
    commodityToBuy.innerHTML = "<option label='Commodity:'>Commodity:</option>";
    planets.get(shipLocation).commodities.forEach((amount, commodity) => {
        if (amount > 0) {
            let option = document.createElement("option");
            option.text = commodity;
            commodityToBuy.add(option);
        }
    });
    let commodityToSell = document.getElementById("commodity_to_sell");
    commodityToSell.innerHTML = "<option label='Commodity:'>Commodity:</option>";
    let commoditiesOnShip = document.getElementById("commodities_on_ship");
    let commodities = "";
    ships.get(ship).commodities.forEach((amount, commodity) => {
        if (amount > 0) {
            let option = document.createElement("option");
            option.text = commodity;
            commodityToSell.add(option);
            commodities += '<tr><td>' + commodity + '</td><td>' + amount + '</td></tr>';
        }
    });
    commoditiesOnShip.innerHTML = commodities;
}
function showShipDuringJourney(ship) {
    console.log("on journey " + ship);
    document.getElementById("ship_name_during_journey").innerText = ship;
    let journeyTime = remainingTime - ships.get(ship).arrivalTime;
    document.getElementById("location_in_journey").innerText = "In journey to: " + ships.get(ship).planet;
    document.getElementById("remaining_time").innerText = "Remaining time after arrival: " + ships.get(ship).arrivalTime;
}
function showPlanetPopup(planetName) {
    document.getElementById("planet_name").innerText = planetName;
    document.getElementById("planet_location").innerText = "Location: " + "(" + planets.get(planetName).x + ", " +
        planets.get(planetName).y + ")";
    let ships_on_planet = "";
    let ships_ref = document.getElementById("ships_on_planet");
    ships_ref.innerHTML = "";
    ships.forEach((ship, shipName) => {
        if (ship.planet == planetName && ship.isOnPlanet) {
            let rowRef = ships_ref.insertRow();
            rowRef.innerHTML = '<tr><td><a href="#popup3" class="button2">' + shipName + '</a></td></tr>';
            rowRef.cells[0].onclick = function () {
                showShipPopup(shipName);
            };
            rowRef.cells[0].id = shipName + "_planet";
        }
    });
    let commoditiesRef = document.getElementById("commodities_on_planet");
    commoditiesRef.innerHTML = "";
    let planet = planets.get(planetName);
    planet.commodities.forEach((amount, commodity) => {
        if (amount > 0) {
            let rowRef = commoditiesRef.insertRow();
            rowRef.innerHTML = '<tr><td>' + commodity + '</td><td>' + amount + '</td><td>' + planet.ask.get(commodity) + '</td><td>' +
                planet.bid.get(commodity) + '</td></tr>';
        }
    });
}
function displayShipCommodities(shipName) {
    let ship = ships.get(shipName);
}
function showShips() {
    let shipsRef = document.getElementById("ships23");
    shipsRef.innerHTML = "";
    ships.forEach((ship, shipName) => {
        if (!ship.isOnPlanet && ship.arrivalTime >= remainingTime) {
            console.log(remainingTime);
            console.log("ship arrived!");
            ship.isOnPlanet = true;
        }
        let rowRef = shipsRef.insertRow();
        if (ship.isOnPlanet) {
            rowRef.innerHTML = '<td><a href="#popup3" class="button">' + shipName + '</a></td><td>' + ship.planet + '</td>';
        }
        else {
            rowRef.innerHTML = '<td><a href="#popup2" class="button">' + shipName + '</a></td><td>' + ship.planet + " (during journey)" + '</td>';
        }
        rowRef.cells[0].onclick = function () {
            showShipPopup(shipName);
        };
        rowRef.cells[0].id = shipName + "_ship";
    });
}
function buyCommodity() {
    let shipName = document.getElementById("ship_name_on_planet");
    let ship = ships.get(shipName.innerText);
    let planetName = ships.get(shipName.innerText).planet;
    console.log(planetName);
    let planet = planets.get(planetName);
    console.log(planet.name);
    let commodityToBuyRef = document.getElementById("commodity_to_buy");
    let commodityToBuy = commodityToBuyRef.options[commodityToBuyRef.selectedIndex].text;
    console.log(commodityToBuy);
    let amountToBuy = parseInt(document.getElementById("amount_to_buy").value);
    console.log("amount to buy: " + amountToBuy);
    let price = amountToBuy * planet.ask.get(commodityToBuy);
    console.log("price: " + price);
    if (commodityToBuy == "Commodity:") {
        showErrorPopup("Choose commodity");
    }
    else if (isNaN(amountToBuy)) {
        showErrorPopup("Choose amount");
    }
    else if (price > balance) {
        showErrorPopup("Not enough balance");
    }
    else if (ship.freeCapacity < amountToBuy) {
        showErrorPopup("Not enough free space on ship");
    }
    else if (amountToBuy > planet.commodities.get(commodityToBuy)) {
        showErrorPopup("Not enough commodity on planet");
    }
    else {
        ship.freeCapacity -= amountToBuy;
        console.log("new capacity: " + ship.freeCapacity);
        console.log("buying " + commodityToBuy + " for " + price);
        updateBalance(balance - price);
        planet.commodities.set(commodityToBuy, planet.commodities.get(commodityToBuy) - amountToBuy);
        console.log("new commodity amount: " + planet.commodities.get(commodityToBuy));
        ship.commodities.set(commodityToBuy, ship.commodities.get(commodityToBuy) + amountToBuy);
        console.log(commodityToBuy + " on ship: " + ship.commodities.get(commodityToBuy));
        showShipPopup(shipName.innerText);
        window.location.href = "#popup3";
    }
}
function sellCommodity() {
    let commodityToSellRef = document.getElementById("commodity_to_sell");
    let commodityToSell = commodityToSellRef.options[commodityToSellRef.selectedIndex].text;
    console.log(commodityToSell);
    let amountToSell = parseInt(document.getElementById("amount_to_sell").value);
    console.log(amountToSell);
    let shipName = document.getElementById("ship_name_on_planet");
    let ship = ships.get(shipName.innerText);
    let planetName = ships.get(shipName.innerText).planet;
    let planet = planets.get(planetName);
    if (commodityToSell == "Commodity:") {
        showErrorPopup("Choose commodity");
    }
    else if (isNaN(amountToSell)) {
        showErrorPopup("Choose amount");
    }
    else if (amountToSell > ship.commodities.get(commodityToSell)) {
        showErrorPopup("Not enough commodity on ship");
    }
    else {
        ship.freeCapacity += amountToSell;
        console.log("new capacity: " + ship.freeCapacity);
        console.log("selling commodity");
        let price = amountToSell * planet.bid.get(commodityToSell);
        updateBalance(balance + price);
        ship.commodities.set(commodityToSell, ship.commodities.get(commodityToSell) - amountToSell);
        planet.commodities.set(commodityToSell, planet.commodities.get(commodityToSell) + amountToSell);
        showShipPopup(shipName.innerText);
    }
}
function countDistance(planet1, planet2) {
    let distanceToTravel = Math.sqrt(Math.pow(planet1.x - planet1.y, 2) + Math.pow(planet1.y - planet2.y, 2));
    return Math.ceil(distanceToTravel);
}
function beginJourney() {
    let planet = ships.get(document.getElementById("ship_name_on_planet").innerText).planet;
    console.log(planet);
    let selectRef = document.getElementById("planet_to_travel");
    let planetToTravel = selectRef.options[selectRef.selectedIndex].text;
    console.log(planetToTravel);
    let planet1 = planets.get(planet);
    let planet2 = planets.get(planetToTravel);
    let distanceToTravel = countDistance(planet1, planet2);
    console.log(distanceToTravel);
    let shipName = document.getElementById("ship_name_on_planet").innerText;
    let ship = ships.get(shipName);
    ship.isOnPlanet = false; // Ship goes on a journey.
    ship.planet = planetToTravel;
    ship.arrivalTime = remainingTime - distanceToTravel;
    console.log("flying from " + planet + " to " + planetToTravel);
    console.log("arrival time: " + ship.arrivalTime);
    showShipPopup(shipName);
    showShips();
    window.location.hash = '#popup2';
}
function showErrorPopup(message) {
    document.getElementById("notification").innerText = message;
    window.location.hash = "notification_popup";
}
showShips();
let initial_data = JSON.parse('{\n' +
    '    "game_duration": 300,\n' +
    '    "initial_credits": 1984,\n' +
    '    "items": [\n' +
    '        "Dwimeryt",\n' +
    '        "Cynamon",\n' +
    '        "Nuka-Cola",\n' +
    '        "Z\u0142oto",\n' +
    '        "Unobtainium",\n' +
    '        "Protea\u0144skie dyski",\n' +
    '        "Ziemniaki",\n' +
    '        "Lyrium",\n' +
    '        "Murkwie",\n' +
    '        "Woda"\n' +
    '    ],\n' +
    '    "planets": {\n' +
    '        "Alderaan": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 74,\n' +
    '                    "buy_price": 6,\n' +
    '                    "sell_price": 6\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 42,\n' +
    '                    "buy_price": 12,\n' +
    '                    "sell_price": 11\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 34,\n' +
    '                    "buy_price": 13,\n' +
    '                    "sell_price": 12\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 5,\n' +
    '                    "buy_price": 76,\n' +
    '                    "sell_price": 69\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 23,\n' +
    '                    "buy_price": 33,\n' +
    '                    "sell_price": 31\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 22,\n' +
    '                    "buy_price": 19,\n' +
    '                    "sell_price": 18\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 10,\n' +
    '                    "buy_price": 92,\n' +
    '                    "sell_price": 86\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 19,\n' +
    '                    "sell_price": 17\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 15,\n' +
    '            "y": 32\n' +
    '        },\n' +
    '        "Argoland": {\n' +
    '            "available_items": {\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 23,\n' +
    '                    "buy_price": 10,\n' +
    '                    "sell_price": 10\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 39,\n' +
    '                    "buy_price": 9,\n' +
    '                    "sell_price": 8\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 5,\n' +
    '                    "buy_price": 73,\n' +
    '                    "sell_price": 64\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 25,\n' +
    '                    "buy_price": 22,\n' +
    '                    "sell_price": 19\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 10,\n' +
    '                    "buy_price": 75,\n' +
    '                    "sell_price": 65\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 69,\n' +
    '                    "sell_price": 61\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 34,\n' +
    '                    "sell_price": 30\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 59,\n' +
    '            "y": 44\n' +
    '        },\n' +
    '        "Arrakis": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 59,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 53,\n' +
    '                    "buy_price": 10,\n' +
    '                    "sell_price": 8\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 89,\n' +
    '                    "sell_price": 76\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 25,\n' +
    '                    "buy_price": 16,\n' +
    '                    "sell_price": 15\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 7,\n' +
    '                    "buy_price": 64,\n' +
    '                    "sell_price": 57\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 36,\n' +
    '                    "sell_price": 33\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 25,\n' +
    '                    "sell_price": 21\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 9,\n' +
    '                    "buy_price": 120,\n' +
    '                    "sell_price": 107\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 16,\n' +
    '                    "buy_price": 23,\n' +
    '                    "sell_price": 21\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 81,\n' +
    '            "y": 34\n' +
    '        },\n' +
    '        "Corellia": {\n' +
    '            "available_items": {\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 38,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 8\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 63,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 91,\n' +
    '                    "sell_price": 84\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 10,\n' +
    '                    "buy_price": 74,\n' +
    '                    "sell_price": 66\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 11,\n' +
    '                    "buy_price": 30,\n' +
    '                    "sell_price": 26\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 71,\n' +
    '                    "sell_price": 66\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 19,\n' +
    '                    "buy_price": 37,\n' +
    '                    "sell_price": 33\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 43,\n' +
    '            "y": 69\n' +
    '        },\n' +
    '        "Encja": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 59,\n' +
    '                    "buy_price": 6,\n' +
    '                    "sell_price": 5\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 56,\n' +
    '                    "buy_price": 10,\n' +
    '                    "sell_price": 10\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 51,\n' +
    '                    "buy_price": 9,\n' +
    '                    "sell_price": 8\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 88,\n' +
    '                    "sell_price": 76\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 35,\n' +
    '                    "buy_price": 17,\n' +
    '                    "sell_price": 16\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 9,\n' +
    '                    "buy_price": 103,\n' +
    '                    "sell_price": 90\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 13,\n' +
    '                    "buy_price": 39,\n' +
    '                    "sell_price": 37\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 32,\n' +
    '                    "sell_price": 32\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 60,\n' +
    '                    "sell_price": 57\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 26,\n' +
    '                    "buy_price": 40,\n' +
    '                    "sell_price": 35\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 91,\n' +
    '            "y": 32\n' +
    '        },\n' +
    '        "Gaia": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 80,\n' +
    '                    "buy_price": 6,\n' +
    '                    "sell_price": 6\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 85,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 41,\n' +
    '                    "buy_price": 10,\n' +
    '                    "sell_price": 9\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 9,\n' +
    '                    "buy_price": 102,\n' +
    '                    "sell_price": 94\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 25,\n' +
    '                    "buy_price": 43,\n' +
    '                    "sell_price": 39\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 8,\n' +
    '                    "buy_price": 92,\n' +
    '                    "sell_price": 82\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 16,\n' +
    '                    "buy_price": 35,\n' +
    '                    "sell_price": 31\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 75,\n' +
    '            "y": 76\n' +
    '        },\n' +
    '        "Ksi": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 33,\n' +
    '                    "buy_price": 11,\n' +
    '                    "sell_price": 10\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 80,\n' +
    '                    "buy_price": 6,\n' +
    '                    "sell_price": 6\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 64,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 4,\n' +
    '                    "buy_price": 73,\n' +
    '                    "sell_price": 67\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 30,\n' +
    '                    "buy_price": 17,\n' +
    '                    "sell_price": 14\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 8,\n' +
    '                    "buy_price": 39,\n' +
    '                    "sell_price": 37\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 41,\n' +
    '                    "sell_price": 39\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 15,\n' +
    '                    "buy_price": 30,\n' +
    '                    "sell_price": 28\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 74,\n' +
    '                    "sell_price": 64\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 16,\n' +
    '                    "buy_price": 20,\n' +
    '                    "sell_price": 18\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 91,\n' +
    '            "y": 71\n' +
    '        },\n' +
    '        "Leonida": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 36,\n' +
    '                    "buy_price": 12,\n' +
    '                    "sell_price": 11\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 50,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 60,\n' +
    '                    "buy_price": 9,\n' +
    '                    "sell_price": 9\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 89,\n' +
    '                    "sell_price": 85\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 39,\n' +
    '                    "buy_price": 18,\n' +
    '                    "sell_price": 16\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 7,\n' +
    '                    "buy_price": 65,\n' +
    '                    "sell_price": 57\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 9,\n' +
    '                    "buy_price": 38,\n' +
    '                    "sell_price": 33\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 5,\n' +
    '                    "buy_price": 121,\n' +
    '                    "sell_price": 112\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 11,\n' +
    '                    "buy_price": 45,\n' +
    '                    "sell_price": 41\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 32,\n' +
    '            "y": 5\n' +
    '        },\n' +
    '        "NowWhat": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 62,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 22,\n' +
    '                    "buy_price": 9,\n' +
    '                    "sell_price": 9\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 9,\n' +
    '                    "buy_price": 67,\n' +
    '                    "sell_price": 66\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 27,\n' +
    '                    "buy_price": 18,\n' +
    '                    "sell_price": 16\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 9,\n' +
    '                    "buy_price": 82,\n' +
    '                    "sell_price": 71\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 4,\n' +
    '                    "buy_price": 74,\n' +
    '                    "sell_price": 63\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 17,\n' +
    '                    "buy_price": 28,\n' +
    '                    "sell_price": 24\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 35,\n' +
    '            "y": 41\n' +
    '        },\n' +
    '        "Sur\'Kesh": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 55,\n' +
    '                    "buy_price": 9,\n' +
    '                    "sell_price": 8\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 34,\n' +
    '                    "buy_price": 9,\n' +
    '                    "sell_price": 8\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 10,\n' +
    '                    "buy_price": 73,\n' +
    '                    "sell_price": 66\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 30,\n' +
    '                    "buy_price": 19,\n' +
    '                    "sell_price": 17\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 5,\n' +
    '                    "buy_price": 85,\n' +
    '                    "sell_price": 79\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 19,\n' +
    '                    "buy_price": 34,\n' +
    '                    "sell_price": 31\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 21,\n' +
    '                    "buy_price": 23,\n' +
    '                    "sell_price": 20\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 8,\n' +
    '                    "buy_price": 99,\n' +
    '                    "sell_price": 95\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 39,\n' +
    '            "y": 31\n' +
    '        },\n' +
    '        "Tairia": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 70,\n' +
    '                    "buy_price": 10,\n' +
    '                    "sell_price": 10\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 43,\n' +
    '                    "buy_price": 6,\n' +
    '                    "sell_price": 5\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 8,\n' +
    '                    "buy_price": 97,\n' +
    '                    "sell_price": 84\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 32,\n' +
    '                    "buy_price": 20,\n' +
    '                    "sell_price": 19\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 19,\n' +
    '                    "buy_price": 44,\n' +
    '                    "sell_price": 41\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 29,\n' +
    '                    "sell_price": 25\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 123,\n' +
    '                    "sell_price": 103\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 14,\n' +
    '                    "buy_price": 37,\n' +
    '                    "sell_price": 34\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 36,\n' +
    '            "y": 84\n' +
    '        },\n' +
    '        "Tatooine": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 60,\n' +
    '                    "buy_price": 11,\n' +
    '                    "sell_price": 10\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 64,\n' +
    '                    "buy_price": 10,\n' +
    '                    "sell_price": 9\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 45,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 81,\n' +
    '                    "sell_price": 71\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 39,\n' +
    '                    "buy_price": 15,\n' +
    '                    "sell_price": 13\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 7,\n' +
    '                    "buy_price": 89,\n' +
    '                    "sell_price": 84\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 13,\n' +
    '                    "buy_price": 37,\n' +
    '                    "sell_price": 32\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 10,\n' +
    '                    "buy_price": 23,\n' +
    '                    "sell_price": 21\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 7,\n' +
    '                    "buy_price": 95,\n' +
    '                    "sell_price": 87\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 19,\n' +
    '                    "buy_price": 35,\n' +
    '                    "sell_price": 32\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 47,\n' +
    '            "y": 68\n' +
    '        },\n' +
    '        "Tuchanka": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 59,\n' +
    '                    "buy_price": 10,\n' +
    '                    "sell_price": 9\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 51,\n' +
    '                    "buy_price": 7,\n' +
    '                    "sell_price": 6\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 65,\n' +
    '                    "buy_price": 11,\n' +
    '                    "sell_price": 10\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 9,\n' +
    '                    "buy_price": 90,\n' +
    '                    "sell_price": 82\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 46,\n' +
    '                    "buy_price": 18,\n' +
    '                    "sell_price": 16\n' +
    '                },\n' +
    '                "Protea\u0144skie dyski": {\n' +
    '                    "available": 10,\n' +
    '                    "buy_price": 71,\n' +
    '                    "sell_price": 65\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 8,\n' +
    '                    "buy_price": 39,\n' +
    '                    "sell_price": 37\n' +
    '                },\n' +
    '                "Woda": {\n' +
    '                    "available": 15,\n' +
    '                    "buy_price": 28,\n' +
    '                    "sell_price": 24\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 10,\n' +
    '                    "buy_price": 61,\n' +
    '                    "sell_price": 57\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 12,\n' +
    '                    "buy_price": 46,\n' +
    '                    "sell_price": 40\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 27,\n' +
    '            "y": 76\n' +
    '        },\n' +
    '        "Ziemia": {\n' +
    '            "available_items": {\n' +
    '                "Cynamon": {\n' +
    '                    "available": 58,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Dwimeryt": {\n' +
    '                    "available": 106,\n' +
    '                    "buy_price": 8,\n' +
    '                    "sell_price": 7\n' +
    '                },\n' +
    '                "Lyrium": {\n' +
    '                    "available": 31,\n' +
    '                    "buy_price": 9,\n' +
    '                    "sell_price": 8\n' +
    '                },\n' +
    '                "Murkwie": {\n' +
    '                    "available": 7,\n' +
    '                    "buy_price": 82,\n' +
    '                    "sell_price": 75\n' +
    '                },\n' +
    '                "Nuka-Cola": {\n' +
    '                    "available": 30,\n' +
    '                    "buy_price": 18,\n' +
    '                    "sell_price": 17\n' +
    '                },\n' +
    '                "Unobtainium": {\n' +
    '                    "available": 21,\n' +
    '                    "buy_price": 37,\n' +
    '                    "sell_price": 36\n' +
    '                },\n' +
    '                "Ziemniaki": {\n' +
    '                    "available": 6,\n' +
    '                    "buy_price": 77,\n' +
    '                    "sell_price": 69\n' +
    '                },\n' +
    '                "Z\u0142oto": {\n' +
    '                    "available": 13,\n' +
    '                    "buy_price": 38,\n' +
    '                    "sell_price": 32\n' +
    '                }\n' +
    '            },\n' +
    '            "x": 94,\n' +
    '            "y": 24\n' +
    '        }\n' +
    '    },\n' +
    '    "starships": {\n' +
    '        "Axiom": {\n' +
    '            "cargo_hold_size": 27,\n' +
    '            "position": "Tatooine"\n' +
    '        },\n' +
    '        "Enterprise": {\n' +
    '            "cargo_hold_size": 46,\n' +
    '            "position": "Corellia"\n' +
    '        },\n' +
    '        "Goliath": {\n' +
    '            "cargo_hold_size": 33,\n' +
    '            "position": "Sur\'Kesh"\n' +
    '        },\n' +
    '        "Hermes": {\n' +
    '            "cargo_hold_size": 26,\n' +
    '            "position": "NowWhat"\n' +
    '        },\n' +
    '        "Millenium Falcon": {\n' +
    '            "cargo_hold_size": 35,\n' +
    '            "position": "Tatooine"\n' +
    '        },\n' +
    '        "Niezwyci\u0119\u017cony": {\n' +
    '            "cargo_hold_size": 60,\n' +
    '            "position": "Argoland"\n' +
    '        },\n' +
    '        "Normandy SR-2": {\n' +
    '            "cargo_hold_size": 40,\n' +
    '            "position": "Gaia"\n' +
    '        },\n' +
    '        "Nostromo": {\n' +
    '            "cargo_hold_size": 25,\n' +
    '            "position": "Arrakis"\n' +
    '        },\n' +
    '        "Rocinante": {\n' +
    '            "cargo_hold_size": 30,\n' +
    '            "position": "Alderaan"\n' +
    '        },\n' +
    '        "\u041a\u043e\u0441\u043c\u043e\u043d\u0430\u0432\u0442 \u0410\u043b\u0435\u043a\u0441\u0435\u0301\u0439 \u041b\u0435\u043e\u0301\u043d\u043e\u0432": {\n' +
    '            "cargo_hold_size": 35,\n' +
    '            "position": "Arrakis"\n' +
    '        }\n' +
    '    }\n' +
    '}\n');
let planetsJSON = initial_data["planets"];
for (let planetJSON in planetsJSON) {
    console.log("planet: " + planetJSON);
    let planet = new Planet(planetJSON);
    let planetInfo = planetsJSON[planetJSON];
    let availableItems = planetInfo["available_items"];
    planet.x = planetInfo["x"];
    planet.y = planetInfo["y"];
    for (let item in availableItems) {
        let it = availableItems[item];
        planet.commodities.set(item, it["available"]);
        planet.ask.set(item, it["buy_price"]);
        planet.bid.set(item, it["sell_price"]);
        planets.set(planetJSON, planet);
    }
}
planets.get("Ziemia").commodities.set("Proteańskie dyski", 0);
planets.get("Ziemia").ask.set("Proteańskie dyski", 10);
planets.get("Ziemia").bid.set("Proteańskie dyski", 9);
planets.get("Ziemia").commodities.set("Woda", 0);
planets.get("Ziemia").ask.set("Woda", 8);
planets.get("Ziemia").bid.set("Woda", 7);
planets.get("Alderaan").commodities.set("Lyrium", 0);
planets.get("Alderaan").ask.set("Lyrium", 30);
planets.get("Alderaan").bid.set("Lyrium", 27);
planets.get("Alderaan").commodities.set("Murkwie", 0);
planets.get("Alderaan").ask.set("Murkwie", 59);
planets.get("Alderaan").bid.set("Murkwie", 59);
planets.get("Argoland").commodities.set("Woda", 0);
planets.get("Argoland").ask.set("Woda", 12);
planets.get("Argoland").bid.set("Woda", 11);
planets.get("Argoland").commodities.set("Unobtanium", 59);
planets.get("Argoland").ask.set("Unobtanium", 59);
planets.get("Argoland").bid.set("Unobtanium", 59);
planets.get("Arrakis").commodities.set("Dwimeryt", 0);
planets.get("Arrakis").ask.set("Dwimeryt", 25);
planets.get("Arrakis").bid.set("Dwimeryt", 23);
planets.get("Corellia").commodities.set("Nuka-Cola", 0);
planets.get("Corellia").ask.set("Nuka-Cola", 45);
planets.get("Corellia").bid.set("Nuka-Cola", 40);
planets.get("Corellia").commodities.set("Woda", 0);
planets.get("Corellia").commodities.set("Woda", 89);
planets.get("Corellia").commodities.set("Woda", 85);
planets.get("Gaia").commodities.set("Murkwie", 0);
planets.get("Gaia").ask.set("Murkwie", 39);
planets.get("Gaia").bid.set("Murkwie", 35);
planets.get("Gaia").commodities.set("Unobtanium", 0);
planets.get("Gaia").ask.set("Unobtanium", 76);
planets.get("Gaia").bid.set("Unobtanium", 70);
planets.get("Gaia").bid.set("Nuka-Cola", 0);
planets.get("Gaia").bid.set("Nuka-Cola", 68);
planets.get("Gaia").bid.set("Nuka-Cola", 60);
planets.get("Leonida").commodities.set("Woda", 0);
planets.get("Leonida").ask.set("Woda", 19);
planets.get("Leonida").bid.set("Woda", 17);
planets.get("NowWhat").commodities.set("Woda", 0);
planets.get("NowWhat").ask.set("Woda", 17);
planets.get("NowWhat").bid.set("Woda", 17);
planets.get("NowWhat").commodities.set("Lyrium", 0);
planets.get("NowWhat").ask.set("Lyrium", 17);
planets.get("NowWhat").bid.set("Lyrium", 16);
planets.get("NowWhat").commodities.set("Unobtanium", 0);
planets.get("NowWhat").commodities.set("Unobtanium", 68);
planets.get("NowWhat").commodities.set("Unobtanium", 65);
planets.get("Sur'Kesh").commodities.set("Dwimeryt", 0);
planets.get("Sur'Kesh").ask.set("Dwimeryt", 46);
planets.get("Sur'Kesh").bid.set("Dwimeryt", 43);
planets.get("Sur'Kesh").commodities.set("Złoto", 0);
planets.get("Sur'Kesh").commodities.set("Złoto", 79);
planets.get("Sur'Kesh").commodities.set("Złoto", 70);
planets.get("Tairia").commodities.set("Dwimeryt", 0);
planets.get("Tairia").ask.set("Dwimeryt", 27);
planets.get("Tairia").bid.set("Dwimeryt", 25);
planets.get("Tairia").commodities.set("Proteańskie dyski", 0);
planets.get("Tairia").commodities.set("Proteańskie dyski", 36);
planets.get("Tairia").commodities.set("Proteańskie dyski", 33);
