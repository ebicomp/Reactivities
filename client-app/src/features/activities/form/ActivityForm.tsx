import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activity:Activity|undefined;
    closeForm:() =>void;
}

const ActivityForm = ({activity,closeForm}:Props) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.Input placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='City' />
                <Form.Input placeholder='Venue' />
                <Button type='submit' floated='right' positive content='Submit' />
                <Button type='button' floated='right' content='Cancel' onClick={closeForm} />
            </Form>
        </Segment>
    );
};

export default ActivityForm;