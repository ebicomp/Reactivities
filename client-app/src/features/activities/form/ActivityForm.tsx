import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import agent from '../../../app/api/agent';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { useNavigate } from "react-router-dom";


const ActivityForm = () => {

    const {activityStore} = useStore();
    const {selectedActivity,createActivity, updateActivity,loading , loadActivity,loadingInitial} = activityStore;
    const navigate = useNavigate();

    const [activity, setActivity] = useState({
        id:'',
        city:'',
        date:'',
        description:'',
        title:'',
        venue:'',
        category:''
    });

    const {id} = useParams<string>();
    useEffect(()=>{


        if(id) loadActivity(id).then(activity=>{
            setActivity(activity!);
        });


    } , [id,loadActivity]);

    const handleSubmit = () =>{
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id:uuid()
            }
            createActivity(newActivity).then(()=>{
                navigate(`/activities/${newActivity.id}`);
            });
        }
        else{
            updateActivity(activity).then(()=>{navigate(`/activities/${activity.id}`);});
        }

    }
    const handleInputChange = (event:ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
        const {name , value} = event.target;
        setActivity({
            ...activity,
            [name]:value
        });
    }

    if(loadingInitial) return <LoadingComponent content='loading activity ...' />
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} type='submit' floated='right' positive content='Submit' />
                <Button type='button' as={Link} to='/activities'  floated='right' content='Cancel' />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);