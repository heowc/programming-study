const welHost = $('#host-input').val();
const welPort = $('#port-input').val();
const welConnect = $('#connect-btn');
const welChatArea = $('#chat-area');

const welRecepient = $('#recepient-input');
const welData = $('#data-input');
const welMessage = $('#message-btn');

var oSocket;


welConnect.click((event) => {
	appendMessage('connecting server...');
	connectToServer();
});


const connectToServer = () => {
	let url = `http://${welHost}:${welPort}`;

	let opts = {
		forceNew: true
	};

	oSocket = io.connect(url, opts);
	oSocket.on('connect', () => {
		appendMessage('connected server');

		oSocket.on('message', (message) => {
			console.log(JSON.stringify(message));

			appendMessage(`나 : ${message.data}`);
		});
	});

	oSocket.on('disconnect', () => {
		appendMessage('disconnected server');
	});
};

welMessage.click((event) => {
	let oMessage = {};
	oMessage.recepient = welRecepient.val();
	oMessage.data = welData.val();

	oSocket.emit('message', oMessage);
});

const appendMessage = (message) => {
	console.log(message);
	welChatArea.append(`<p>${message}</p>`);
};