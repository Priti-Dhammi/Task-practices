import { Meteor  } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './tasks.js';
import './body.html';

Template.body.onCreated(function onBodyCreated(){
	this.state = new ReactiveDict();
	Meteor.subscribe('TasksPub');
});
//tasks is the name of helper that returns an array
Template.body.helpers({
	// tasks:[ 
	// 	{ text : 'This is text1'},
	// 	{ text : 'This is text2'},
	// 	{ text : 'This is text3'},
	// ],
	tasks(){
		const instance = Template.instance();
		console.log("Template.instance(): ",instance);
		if(instance.state.get('hideCompleted')){
 			return Tasks.find({checked: {$ne:true}},{sort: {createdOn:-1} } );
		}
		return Tasks.find({},{ sort : { createdOn : -1 } });
	},
	incompleteCount(){
		var count = Tasks.find({checked: {$ne:true} } ).count();
		return count;
	}
});
//submit event gets triggered when enter is pressed inside input box
Template.body.events({
	'submit .new-task'(event){
		event.preventDefault();
		console.log("Event Argument receieved by Event Handler: ",event);
		
		//to get value from form
		const target = event.target;//contains all of new-task form
		const text = target.text.value;
		//If the Method throws an error, you get that in the first 
		//argument of the callback. If the Method succeeds, you get the
		//result in the second argument and the first argument err will 
		//be undefined.
		
		Meteor.call('Tasks.add',
			text,(err,res) => {
				if(err){
					alert(err);
				} else {
					("Success!: ",res);
				}
			}
		);
		// console.log("Meteor: ",Meteor);
		
		// //to insert value in collection
		// //userId(): to get current user's id
		// //user(): to get whole user document
		// console.log("Meteor.userId(): ",Meteor.userId());
		// console.log("Meteor.user().username: ",Meteor.user().username);
		// Tasks.insert({
		// 	text,
		// 	'createdOn' : new Date(), 
		// 	owner: Meteor.userId(),
  //     		username: Meteor.user().username,
		// });
		target.text.value = ""; 
	},
	'change .hide-completed'(event,instance){
		instance.state.set('hideCompleted',event.target.checked);
	},
});