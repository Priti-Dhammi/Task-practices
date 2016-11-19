Tasks.schema = new SimpleSchema({
  name: {type: String},//specifies that name is required and must be a String value
  incompleteCount: {type: Number, defaultValue: 0},
  userId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

const taskCheck = {
	name: 'Task Check',
	incompleteCount: 3
};
Tasks.schema.validate(taskCheck);
Tasks.attachSchema(Tasks.schema);
Tasks.helpers({
	ts(){
		return Tasks.find({owner: this.userId }, {sort:{createdOn:-1}}); 
	}
});
const ts = Tasks.findOne();
console.log('ts: ',ts);
