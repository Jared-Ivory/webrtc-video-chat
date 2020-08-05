import React from 'react';

import VideoConference from '../Components/VideoConference';

export default function Room(props) {
    return (
        <div>
            <div>
                <VideoConference roomID={props.match.params.roomID} />
            </div>
        </div>
    );
}
