import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export default function VideoConference(props) {
    const [peers, setPeers] = useState([]);

    const socketRef = useRef();
    const userRef = useRef();

    //array of socket ids connected to peer objects
    const peersRef = useRef([]);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                userRef.current.srcObject = stream;

                socketRef.current = io.connect('/');
                socketRef.current.emit('join room', props.roomID);
                socketRef.current.on('all users', getPeers);
                socketRef.current.on('user joined', () => {
                    //establish connections between client and other peers
                    peersRef.forEach((peer) => {
                        //connect from client to peer
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
        return function cleanup() {
            //close up shop
            //socketRef.current.close();
        };
    });

    function getPeers(users) {
        const peers = [];
        users.forEach((peerID) => {
            const peer = { peerID };
            peersRef.current.push(peer);

            peers.push(peerID);
            setPeers(peers);
        });
    }

    return (
        <div>
            <div>VideoConference</div>
            <div className="video-conference">
                <video
                    muted
                    controls
                    style={{ height: 500, width: 500 }}
                    autoPlay
                    ref={userRef}
                />
                {peers.map((peer, index) => {
                    return <video key={index} peer={peer} />;
                })}
            </div>
        </div>
    );
}
