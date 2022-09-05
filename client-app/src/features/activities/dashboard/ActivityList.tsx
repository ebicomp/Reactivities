
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';


const ActivityList = () => {
    const {activityStore} = useStore();
    const {groupedActivities , actvitiesByDate}= activityStore;
    console.log(groupedActivities);
    return (
        // <>
        // {groupedActivities.map(([group,activities])=>{
        //     <Fragment key={group}>
        //         <Header sub color='teal'>
        //             {group}
        //         </Header>
        //         <Segment>
        //             <Item.Group divided>
        //                 {
        //                     activities.map(activity => <ActivityListItem key={activity.id} activity={activity} />)
        //                 }
        //     </Item.Group>
        //         </Segment>
        //     </Fragment>


        // })}
        // </>

        <>
        <Segment>
            <Item.Group divided>
        {actvitiesByDate.map(activity=> <ActivityListItem key={activity.id} activity={activity} />)}
        </Item.Group>
        </Segment>
        </>
    );
};



export default observer(ActivityList);