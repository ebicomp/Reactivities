import React, { Fragment, useEffect, useState } from 'react';

import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity]= useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response =>{
      setActivities(response.data);
      console.log(response.data);
    })
  },[]);

  const handleSelectActivity = (id:string)=>{
    const activity = activities.find(q=>q.id === id);
    setSelectedActivity(activity);
  }
  
  const hanleCancelSelectActivity = () =>{
    setSelectedActivity(undefined);
  }
  const handleFormOpen = (id?:string) =>{
    id?handleSelectActivity(id):hanleCancelSelectActivity();
    setEditMode(true);
  }
  const handleFormClose = ()=>{
    setEditMode(false);
  }
  return (
    <Fragment>
      <NavBar openForm = {handleFormOpen}/>
      <Container style={{ marginTop:'7em' }}>
        <ActivityDashboard 
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={hanleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose} />
      </Container>
      </Fragment>
  );
}

export default App;
