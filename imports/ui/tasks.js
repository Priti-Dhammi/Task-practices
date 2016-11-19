import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Tasks} from '../api/tasks.js'
import './tasks.html';

Template.task.helpers({//s2
	isOwner(){
		return this.owner === Meteor.userId();
	},
});
Template.task.events({
	'click .toggle-checked'(){
		Meteor.call('Tasks.setChecked', this._id, !this.checked);
		// Tasks.update(this._id,  
		// 	{ $set: {checked: !this.checked},
		// });
	},
	'click .delete'(){
		Meteor.call('Tasks.delete', this._id)
		// Tasks.remove(this._id);
	},
	'click .toggle-private'(){ //s4
		Meteor.call('Tasks.setPrivate', this._id, !this.private)
	}
});
