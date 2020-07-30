import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateRoom from '../routes/CreateRoom';
import Room from '../routes/Room';

import '../styles/default.css';

export default function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact component={CreateRoom} />
                    <Route path="/room/:roomID" component={Room} />
                </Switch>
            </Router>
        </div>
    );
}
