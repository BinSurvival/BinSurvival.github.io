console.log("Admin JavaScript loaded successfully!");

document.getElementById('saveButton').addEventListener('click', savesetting);
document.getElementById('shuffleRolesButton').addEventListener('click', shuffleRoles);

function savesetting() {
    // 获取已选择的玩家和角色
    const selectedPlayers = Array.from(document.querySelectorAll('#player-selection input:checked')).map(player => player.value);
    const selectedRoles = Array.from(document.querySelectorAll('#roles-selection input:checked')).map(role => role.value);

    // 检查玩家数量与角色数量
    if (selectedPlayers.length !== selectedRoles.length) {
        alert("玩家数量和角色数量不匹配，请检查设置！");
        return;
    }

    // 构建请求数据
    const assignedRoles = selectedPlayers.map((player, index) => ({
        player: player,
        role: selectedRoles[index]
    }));

    const data = { assignedRoles };

    // 将数据发送到服务器
    fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)  // 发送选中的玩家和角色数据
    })
        .then(response => {
            if (!response.ok) throw new Error('网络错误');
            return response.json();
        })
        .then(data => {
            console.log('成功:', data);
            alert("游戏开始！角色已分配，数据已保存。");
        })
        .catch(error => {
            console.error("数据保存时发生错误：", error);
        });
}

function shuffleRoles() {
    // 获取已选择的玩家
    const selectedPlayers = Array.from(document.querySelectorAll('#player-selection input:checked')).map(player => player.value);

    // 读取游戏数据
    fetch('/gameData')
        .then(response => {
            if (!response.ok) throw new Error('无法获取游戏数据');
            return response.json();
        })
        .then(data => {
            const assignedRoles = data.assignedRoles;

            // 打乱角色的顺序
            const shuffledRoles = assignedRoles.map(role => role.role).sort(() => Math.random() - 0.5);

            // 将打乱后的角色与玩家配对
            const newAssignedRoles = selectedPlayers.map((player, index) => ({
                player: player,
                role: shuffledRoles[index % shuffledRoles.length]  // 处理玩家数量大于角色数量的情况
            }));

            // 构建请求数据
            const updatedData = { assignedRoles: newAssignedRoles };

            // 将更新后的数据发送到服务器
            fetch('/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData)
            })
                .then(response => {
                    if (!response.ok) throw new Error('网络错误');
                    return response.json();
                })
                .then(data => {
                    console.log('角色顺序打乱成功:', data);
                    alert("角色顺序已成功打乱并保存。");
                })
                .catch(error => {
                    console.error("打乱角色顺序时发生错误：", error);
                });
        })
        .catch(error => {
            console.error("获取游戏数据时发生错误：", error);
        });
}