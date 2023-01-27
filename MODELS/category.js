const monogoose = require("mongoose")

const CategorySchema = new monogoose.Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    color:{type:String,required:true},
    icon:{type:String,required:true},
    image:{type:String,required:true},
})

const Category = monogoose.model("categories",CategorySchema);

module.exports=Category;