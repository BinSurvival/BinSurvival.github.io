document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    const data = {
        name: name,
        age: age
    };

    // 将数据发送到服务器
    fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('成功:', data);
        })
        .catch((error) => {
            console.error('错误:', error);
        });
});
