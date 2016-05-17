var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');



var AdminSchema = mongoose.Schema({

    password: {type: String, select: false}


});


AdminSchema.pre('save', function(next) {

    var admin = this;


    if (!admin.isModified('password')) return next();

    bcrypt.hash(admin.password, null, null, function (err, hash) {
        if(err) return next(err);

        admin.password = hash;
        next();

    });
});


AdminSchema.methods.comparePassword = function(password) {

    var admin = this;

    var a = bcrypt.compareSync(password, admin.password);

    if (a == true)
        return true;
    else {
        return false;
    }

}




module.exports=mongoose.model('Admin',AdminSchema);
