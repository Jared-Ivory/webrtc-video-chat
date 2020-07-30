import React from 'react';
import { v1 as uuid } from 'uuid';

export default function CreateRoom(props) {
    function create() {
        //Create a unique room
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return <button onClick={create}>Create Room</button>;
}
