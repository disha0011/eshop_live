const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({

    name: { type: String, require: true },
    description: { type: String, require: true },
    richdescription: { type: String, require: true },
    image: { type: String, require: true },
    images: { type: String, require: true },
    brands: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", require: true },
    countInStock: { type: Number, require: true },
    rating: { type: Number, require: true },
    isFeatured: { type: Boolean, require: true },
    dateCreated: { type: Date, require: true },
});

productsSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

productsSchema.set("toJSON", {
    virtual:true,
});

const products = mongoose.model("products", productsSchema);

module.exports = products;