// 导入 http 和 fs 模块
const http = require('http');
const fs = require('fs');
const path = require('path');

// 创建服务器对象
const server = http.createServer((req, res) => {
    const reqPath = req.url.split('?')[0];
    let filePath = reqPath === '/' ? '/public/index.html' : '/public' + reqPath;
    filePath = path.join(__dirname, filePath);

    // API 端点：提供游戏数据
    if (reqPath === '/gameData') {
        const gameDataPath = path.join(__dirname, 'gameData.json');
        fs.readFile(gameDataPath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "无法读取游戏数据。" }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
        return;
    }

    // API 端点：提供已选择的玩家数据
    if (reqPath === '/getSelectedPlayers') {
        // 假设您已经保存了玩家数据在 gameData.json 中
        const gameDataPath = path.join(__dirname, 'gameData.json');
        fs.readFile(gameDataPath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "无法读取玩家数据。" }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
        return;
    }

    // 处理保存数据的 POST 请求
    if (reqPath === '/saveData' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);  // 接收的 JSON 格式必须包含 { "assignedRoles": [...] }
                const saveDataPath = path.join(__dirname, 'gameData.json');

                // 写入 JSON 文件
                fs.writeFile(saveDataPath, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: "无法保存数据" }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ status: 'success' }));
                    }
                });
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: '无效的请求数据' }));
            }
        });
        return;
    }

    // 读取其他文件
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 - 文件未找到');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('服务器错误');
            }
        } else {
            let contentType = 'text/html';
            if (path.extname(filePath) === '.css') {
                contentType = 'text/css';
            } else if (path.extname(filePath) === '.js') {
                contentType = 'text/javascript';
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// 指定服务器端口
const port = 3000;

// 服务器监听端口
server.listen(port, () => {
    console.log(`服务器正在端口 ${port} 上运行...`);
});
