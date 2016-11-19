//add to line 44 
const id = Meteor.userId();
		Meteor.call('Tasks.find', id, (err,res) => {
				if(err){
					alert(err);
				} else {
					console.log("HII: ",res);
				}
			}
		);