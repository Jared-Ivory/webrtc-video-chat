import React from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { generate as createID } from 'shortid';

export default function CreateRoom(props) {
    function create() {
        //Create a unique room
        const id = createID();
        props.history.push(`/room/${id}`);
    }

    return (
        <Container className="align-items-center">
            <Jumbotron className="text-center">
                <h1>Stream to a buddy</h1>
                <Row>
                    <Col>
                        <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={create}
                        >
                            {' '}
                            Create Room
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    );
}
