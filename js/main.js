console.log("JavaScript file loaded successfully!");

function goToPlayerPage() {
    const playerNumber = document.getElementById("player-number").value;

    // 存储已选择的玩家号码
    let selectedPlayers = JSON.parse(localStorage.getItem("selectedPlayers")) || [];

    // 确保号码唯一
    if (!selectedPlayers.includes(playerNumber) && playerNumber >= 1 && playerNumber <= 16) {
        selectedPlayers.push(playerNumber);
        localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
        alert(`成功选择 ${playerNumber} 号玩家！`); // 提示用户
    } else {
        alert("号码已存在或无效，请选择其他号码！");
        return; // 如果无效，则返回
    }

    // 跳转到玩家页面
    window.location.href = `player.html?player=${playerNumber}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const playerNumber = urlParams.get("player");

    if (!playerNumber) {
        console.error("玩家编号缺失！");
        alert("请先选择玩家编号！");
        return;
    }

    const assignedRoles = JSON.parse(localStorage.getItem("assignedRoles")) || [];
    console.log("已分配的角色：", assignedRoles);  // 输出以验证

    const playerRole = assignedRoles.find(role => role.player === playerNumber)?.role || "无角色分配";

    document.getElementById("player-number").innerText = playerNumber;
    document.getElementById("player-role").innerText = playerRole;
});