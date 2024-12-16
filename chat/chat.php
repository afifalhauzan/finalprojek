<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fff8dc; /* Warna latar kuning muda */
        }
        .chat-container {
            width: 100%;
            max-width: 600px;
            margin: 50px auto;
            border: 1px solid #f1c40f; /* Kuning terang */
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .chat-header {
            background-color: #f1c40f;
            color: #fff;
            padding: 15px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        .chat-messages {
            height: 300px;
            overflow-y: auto;
            padding: 15px;
            background-color: #fff;
        }
        .chat-messages .message {
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 4px;
        }
        .chat-messages .message.sent {
            background-color: #fef9e7;
            align-self: flex-end;
        }
        .chat-messages .message.received {
            background-color: #f7dc6f;
        }
        .chat-input {
            display: flex;
            padding: 10px;
            background-color: #f9e79f;
            border-radius: 0 0 8px 8px;
        }
        .chat-input input[type="text"] {
            flex: 1;
            padding: 10px;
            border: 1px solid #f1c40f;
            border-radius: 4px;
            outline: none;
            font-size: 16px;
        }
        .chat-input button {
            margin-left: 10px;
            padding: 10px 15px;
            background-color: #f1c40f;
            border: none;
            border-radius: 4px;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }
        .chat-input button:hover {
            background-color: #d4ac0d;
        }
        .chat-input button.location {
            background-color: #f1c40f;
            color: #fff;
        }
        .chat-input button.location:hover {
            background-color: #d4ac0d;
        }
        .chat-input button svg {
            fill: #fff;
        }
        .success-message {
        color: green;
        font-size: 14px;
        margin-top: 5px;
        }
        /*khansa nambahin*/
        .route-button {
            display: inline-block;
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .route-button:hover {
            background-color: #2980b9;
        }

    </style>
</head>
<body>
    <div class="chat-container">
        <div class="chat-header">Chat App</div>
        <div class="chat-messages" id="chatMessages"></div>
        <div class="chat-input">
            <input type="text" id="messageInput" placeholder="Type your message here...">
            <button id="sendButton">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M120 896v-192L720 576 120 448V256l720 320-720 320Z"/></svg>
            </button>
            <button class="location" id="locationButton">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 776q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0 280q-142-72-221-212.5T180 480q0-165 106.5-271.5T480 96q165 0 271.5 106.5T858 480q0 158-79 298.5T480 1056Z"/></svg>
            </button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
