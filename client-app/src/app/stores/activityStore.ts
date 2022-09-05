import { Activity } from './../models/activity';
import {makeAutoObservable, runInAction} from "mobx"
import agent from '../api/agent';

export default class ActivityStore{
    ActivityRegistry = new Map<string, Activity>();
    selectedActivity : Activity| undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor(){
        makeAutoObservable(this);
    }
    loadActivities = async () => {
         this.setLoadingInitial(true);
         try{

            const activities = await agent.Activities.list();

            activities.forEach(activity=>{
                this.setActivity(activity);
            });
            this.setLoadingInitial(false);

         }
         catch(error){
            console.log(error);
            this.setLoadingInitial(false);
         }
    }
    
    loadActivity = async(id:string)=>{
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            return activity;
        }
        else{
            this.loadingInitial = true;
            try{
                activity = await agent.Activities.detail(id);
                this.setActivity(activity);
                this.setLoadingInitial(false);
                return activity;
            }
            catch(error){
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
        
    }
    private getActivity = (id:string)=>{
        return this.ActivityRegistry.get(id);
    }
    private setActivity = (activity:Activity)=>{
        activity.date = activity.date.split('T')[0];
        this.ActivityRegistry.set(activity.id,activity);
    }
    get actvitiesByDate(){
        return Array.from(this.ActivityRegistry.values())
        .sort((a,b)=> Date.parse(a.date)- Date.parse(b.date))
    }
    get groupedActivities(){
        return Object.entries(
            this.actvitiesByDate.reduce((activities,activity)=>{
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date] , activity]:  [activity];
                return activities;
            },{} as {[key:string]:Activity[]})
        )
    }

    setLoadingInitial=(state:boolean)=>{
        this.loadingInitial = state;
    }
    // selectActivity=(id:string)=>{
    //     this.selectedActivity = this.ActivityRegistry.get(id);
    // }
    // cancelSelectedActivity = () =>{
    //     this.selectedActivity = undefined;
    // }
    // openForm = (id?:string) =>{

    //     id? this.selectActivity(id): this.cancelSelectedActivity();
    //     this.editMode = true;

    // }
    // closeForm = () =>{
    //     this.editMode = false;
    // }
    createActivity= async(activity:Activity) =>{
        this.loading = true;
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.ActivityRegistry.set(activity.id , activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });

        }
        catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            });
        }
    }
    updateActivity = async(activity:Activity)=>{
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.ActivityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            });

        }
        catch(error){
            console.log(error);
            runInAction(()=>{
                this.editMode = false;
                this.loading = false;
            });
        }
    }

    deleteActivity=async(id:string)=>{
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.ActivityRegistry.delete(id);
                this.loading = false;
            });
        }
        catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            });
            
        }
    }

    
}