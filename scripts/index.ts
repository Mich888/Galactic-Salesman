class Player {
    name: String;
    score: number;
    constructor(public n: String, public s: number) {
        this.name = n;
        this.score = s;
    }
}

function displayLeaderboard(players: Player[]) {
    let board = "";
    players.sort((firstPlayer: Player, secondPlayer: Player) => secondPlayer.score - firstPlayer.score);
    players.forEach((player) => board += '<tr><td>' + player.name + '</td><td>' + player.score + '</td></tr>');
    document.getElementById("leaderboard").innerHTML = board;
    console.log(board);
}

function updateNickname(id: string) {
    let nickname: string = (<HTMLInputElement>document.getElementById("nickname")).value;
    console.log("nickname: " + nickname);
    localStorage.setItem("nickname", nickname);
}

let player1 = new Player("mj", 999);
let player2 = new Player("Charles", 100);
let player3 = new Player("kacperosky", 50);
let player4 = new Player("kozlowsky", 49);
let player5 = new Player("lanos", 48);
let generatedLeaderboard: Player[] = [player1, player2, player3, player4, player5];
let leaderboard: Player[] = [];

if (localStorage.getItem("leaderboard") != null) {
    console.log("got leaderboard");
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
}

if (localStorage.getItem("leaderboard") === null) {
    console.log("new leaderboard");
    leaderboard = generatedLeaderboard;
}
else {
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
}

displayLeaderboard(leaderboard);

let nickname: string = (<HTMLInputElement>document.getElementById("nickname")).value;
console.log("nickname: " + nickname);
localStorage.setItem("nickname", nickname);

