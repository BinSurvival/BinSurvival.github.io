console.log("Choose JavaScript loaded successfully!");
function goToPlayerPage()
    {
    const playerNumber = document.getElementById("player-number").value;

    // 存储已选择的玩家号码
    let selectedPlayers = JSON.parse(localStorage.getItem("selectedPlayers")) || [];

    // 确保号码唯一
    if (playerNumber && !selectedPlayers.includes(playerNumber))
        {
        selectedPlayers.push(playerNumber);
        localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
        }

    // 跳转到玩家页面
        window.location.href = `player.html?player=${playerNumber}`;
    }
