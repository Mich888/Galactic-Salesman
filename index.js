class Player {
    constructor(n, s) {
        this.n = n;
        this.s = s;
        this.name = n;
        this.score = s;
    }
}
function displayLeaderboard(players) {
    let board = "";
    players.sort((firstPlayer, secondPlayer) => secondPlayer.score - firstPlayer.score);
    players.forEach((player) => board += '<tr><td>' + player.name + '</td><td>' + player.score + '</td></tr>');
    document.getElementById("leaderboard").innerHTML = board;
    console.log(board);
}
function updateNickname(id) {
    let nickname = document.getElementById("nickname").value;
    console.log("nickname: " + nickname);
    localStorage.setItem("nickname", nickname);
}
let player1 = new Player("mj", 999);
let player2 = new Player("Charles", 100);
let player3 = new Player("kacperosky", 50);
let player4 = new Player("kozlowsky", 49);
let player5 = new Player("lanos", 48);
let generatedLeaderboard = [player1, player2, player3, player4, player5];
let leaderboard = [];
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
let nickname = document.getElementById("nickname").value;
console.log("nickname: " + nickname);
localStorage.setItem("nickname", nickname);
