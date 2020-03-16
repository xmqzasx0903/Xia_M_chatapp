// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";
import loginModal from './modules/loginModal.js';

const socket = io();

// the packet is whatever data we sent through with the connect event
// from the server

// this is data destructing. Go look it up on MDN
function setUserId({
    sID
}) {
    // debugger;
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage() {
    console.log('a user disconnected');

    socket.emit('chat_message', {
        name: this.nickname || "anonymous",
        left: true
    })
}

function appendMessage(message) {
    vm.messages.push(message);
}

const vm = new Vue({
    data: {
        socketID: "",
        message: "",
        nickname: "",
        messages: [],
        openStatus: true,
        newUser: true
    },
    // data: {
    //     message:[
    //         {
    //             name: "TVR",
    //             content:"hello"
    //         },

    //         {
    //             name: "dd",
    //             content:"ignore"
    //         }

    //     ]
    // },

    methods: {
        // emit a message event to the server so that it can in 
        // turn send this to anyone who's connected
        dispatchMessage() {
            console.log('handle emit message');

            // the double pipe || is an "or" operator
            // if the first value is set, use it. else use
            // whatever comes after the "or" operator
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous",
                newUser: false
            })

            this.message = "";
        },

        getUsername(username) {
            this.nickname = username;
            this.openStatus = false;
            if (this.newUser === true) {
                socket.emit('chat_message', {
                    name: this.nickname || "anonymous",
                    newUser: true
                });
                this.newUser = false;
            }
        },

        onChangeNickname() {
            this.openStatus = true;
        },

        handleClose() {
            this.openStatus = false;
        }
    },

    mouted: function () {
        console.log('vue is done mounting');
    },

    components: {
        newmessage: ChatMessage,
        loginModal
    }
}).$mount("#app");

socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);