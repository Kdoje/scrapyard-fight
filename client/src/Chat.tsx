import React from 'react';
import { Socket } from 'socket.io-client';

export type ChatProps = {
    socket: Socket;
}

export type ChatState = {
    message: string
}
export class Chat extends React.Component<ChatProps, ChatState> {
  
    constructor(props: ChatProps) {
        super(props);
        this.state = {message: "hi"};
        this.props.socket.on('message', messageContent => {
            console.log(messageContent);
            this.setState({message: messageContent})
        });
    }

    render() {
        return (
          <div onClick={column => {this.props.socket.emit('message', 'new message'); console.log('printed message')}}>
            Hello, Kent
            <br />
            The message is: {this.state.message}
          </div>
        )
      }
}
