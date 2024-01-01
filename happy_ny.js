const WebSocket = require('ws');
const MongoClient = require('mongodb').MongoClient;

// MongoDB 连接 URL
const url = 'mongodb+srv://Christinaguo:ZFjSjUdfagrZzWfa@cluster0.muh8whd.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(url, (err, client) => {
    if (err) throw err;

    console.log("Connected to MongoDB");
    const db = client.db('Christinaguo');
    const collection = db.collection('messages');

    const server = new WebSocket.Server({ port: 8080 });
    
    server.on('connection', socket => {
        // 发送历史消息
        collection.find().toArray((err, messages) => {
            if (err) throw err;
            messages.forEach(message => socket.send(message.text));
        });

        socket.on('message', message => {
            // 保存消息到数据库
            collection.insertOne({ text: message });

            // 广播消息
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
    });

    console.log('WebSocket server started on ws://localhost:8080');
});
