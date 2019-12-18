import React, {Component, useState} from 'react'
import { TextInput, StyleSheet, Button, View,Text } from 'react-native';

var name;
var connectedUser;

//connecting to our signaling server
var conn = new WebSocket('ws://localhost:9090');
conn.onopen = () => {
    console.log('Connected to the signaling server')
}

conn.onerror = err => {
    console.log(err)
}

export default class Login extends Component {

    componentDidMount() {

        //when we got a message from a signaling server
        conn.onmessage = function (msg) {
            console.log("msg======================", msg)
            console.log(msg.data);
            // var data =JSON.parse(msg.data);
            console.log("****************", Object.keys(msg.data).length )
            let data = Object.keys(msg.data).length > 0 ? msg.data : JSON.parse(msg.data);
            console.log(data.type)

            switch(data.type) {
                case "login":
                    handleLogin(data.success);
                    break;
                //when somebody wants to call us
                case "offer":
                    // handleOffer(data.offer, data.name);
                    break;
                case "answer":
                    // handleAnswer(data.answer);
                    break;
                //when a remote peer sends an ice candidate to us
                case "candidate":
                    // handleCandidate(data.candidate);
                    break;
                case "leave":
                    // handleLeave();
                    break;
                default:
                    break;
            }
        };
    }

    constructor() {
        super()
        this.state = {
            value: ""
        }
        this.handleChangeText = this.handleChangeText.bind(this)
    }

    handleChangeText(newText) {
        this.setState({
            value:newText
        });
    };

    send(message) {
        //attach the other peer username to our messages
        if (connectedUser) {
            message.name = connectedUser;
        }
        console.log("message", message);
        conn.send(JSON.stringify(message));
    };

    onPressButton() {
        console.log("buttttttttttonnnnnnnnn")
        if(this.state.value.length > 0) {
            console.log("button got pressed")
            this.send({
                type: "login",
                name: this.state.value
            })
        }
    }
    handleLogin(success) {

        console.log("login has suaksjfaskjfsfk")
        if (success === false) {
            alert("Ooops...try a different username");
        } else {
            // this.props.navigation.navigate('Home')}
            console.log("login succeded")
        }
    };
   
    render() {
        return (
            <View>
            <TextInput
                style={{top: 200,left:30, width: 300, height: 40, borderColor: 'gray', borderWidth: 1 }}
                placeholder='Enter Name to Login'
                onChangeText={this.handleChangeText}
                // value={this.state.value}
                defaultValue={this.state.value}
            />
            <View style={{top:230, height: 40, width: 200,left: 60, backgroundColor: 'blue'}}>
                <Button color = 'white'
                title="Login"
                onPress={() => 
                    this.onPressButton()
                    // this.props.navigation.navigate('Home')}
                }
                />
            </View>
            </View>
        );
    };
  
}