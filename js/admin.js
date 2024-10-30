console.log("Admin JavaScript loaded successfully!");

function startGame() {
    const selectedPlayers = Array.from(document.querySelectorAll('#player-selection input:checked')).map(input => input.value);
    const selectedRoles = Array.from(document.querySelectorAll('#roles-selection input:checked')).map(role => role.value);

    console.log("已选择的玩家：", selectedPlayers);  // 输出已选择的玩家
    console.log("已选择的角色：", selectedRoles);  // 输出已选择的角色

    // 检查玩家数量与角色数量
    if (selectedPlayers.length !== selectedRoles.length) {
        alert("玩家数量和角色数量不匹配，请检查设置！");
        return;
    }

    const assignedRoles = assignRoles(selectedPlayers, selectedRoles);
    localStorage.setItem("assignedRoles", JSON.stringify(assignedRoles));
    console.log("分配的角色：", assignedRoles);  // 输出分配的角色以供检查
    alert("游戏开始！角色已分配。");
}

function assignRoles(players, roles) {
    const assigned = [];
    const shuffledRoles = [...roles].sort(() => Math.random() - 0.5);  // 随机打乱角色

    players.forEach((player, index) => {
        assigned.push({ player: player, role: shuffledRoles[index] });
    });

    return assigned;
}