import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';


const ActivityList = () => {
    const {activityStore} = useStore();
    const {loading ,deleteActivity , selectActivity , actvitiesByDate }= activityStore;
    return (
        <Segment>
            <Item.Group divided>
                {
                    actvitiesByDate.map(activity => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button floated='right' content='View' color='blue' onClick={()=>selectActivity(activity.id)} />
                                    <Button loading={loading} floated='right' content='Delete' color='red' onClick={()=>deleteActivity(activity.id)} />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))
                }
            </Item.Group>
        </Segment>
    );
};



export default observer(ActivityList);