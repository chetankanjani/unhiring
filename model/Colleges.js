var mongoose=require('mongoose');
var Schema=mongoose.Schema;



var CollegesSchema = mongoose.Schema({

    name:{type:String},
    degree:[{type:String}]


});


module.exports=mongoose.model('Colleges',CollegesSchema);
