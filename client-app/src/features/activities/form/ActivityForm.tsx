import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    activity:Activity|undefined;
    closeForm:() =>void;
    createOrEdit:(activity:Activity)=>void;
    submiting:boolean;
}

const ActivityForm = ({activity:selectedActivity,closeForm,createOrEdit,submiting}:Props) => {

    const initialState = selectedActivity?? {
        id:'',
        city:'',
        date:'',
        description:'',
        title:'',
        venue:'',
        category:''
    };

    const [activity, setActivity] = useState(initialState);

    const handleSubmit = () =>{
        createOrEdit(activity);
    }
    const handleInputChange = (event:ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
        const {name , value} = event.target;
        setActivity({
            ...activity,
            [name]:value
        });
    }
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={submiting} type='submit' floated='right' positive content='Submit' />
                <Button type='button' floated='right' content='Cancel' onClick={closeForm} />
            </Form>
        </Segment>
    );
};

export default ActivityForm;