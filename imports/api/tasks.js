import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

//Mongo.Collection is a reactive data source, i.e. Collections are in synch with the server.
export const Tasks = new Mongo.Collection('Tasks');

if(Meteor.isServer){
	//this code runs only on server n 'TasksPub = name of publiction registered on the server'
	Meteor.publish('TasksPub',function tasksPublication(){
		return Tasks.find();
	});
}

Meteor.methods({
	'Tasks.add'(text){
		check(text,String);
	
		if(! this.userId){
			throw new Meteor.error("NOT Authorised!");
		}
		Tasks.insert({
			text,
			createdOn: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},
	'Tasks.delete'(textId){
		check(textId,String);

		Tasks.remove(textId);
	},
	'Tasks.setChecked'(textId,setChecked){
		check(textId,String);
		check(setChecked, Boolean);

		Tasks.update(textId,{ $set: {checked:!this.setChecked} });
	},	
	'Tasks.find'(userId){
		return Tasks.findOne({ owner: this.userId });
	},
	'Tasks.setPrivate'(taskId,setPrivate){ //s5
		check(taskId,String);
		check(setPrivate,Boolean);
		
		//to check whether it's the task of logged in user or not
		const task = Tasks.findOne(taskId);
		if(task.owner !== this.userId){
			throw new Meteor.error('not-authorised');
		}
		Tasks.update(taskId, {$set: { private: setPrivate } });
	},
});