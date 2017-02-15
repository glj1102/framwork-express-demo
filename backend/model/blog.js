var db = require('mongoose'),
    Schema = db.Schema;


var Comment = new Schema({
    cid        : { type: String},
    message    : {type: String},
    status     : { type: Number, default: 0}, //1: OK
    create_date: { type: Number, default: Date.now}
}, { _id: false });

var Blog = new Schema({
    blog_id        : { type: String, unique: true, index: true },
    name           : { type: String},
    content        : { type: String, default: ''},
    comments       : [Comment],
    create_date    : { type: Number, default: Math.round(Date.now() / 1000)},
    update_date    : { type: Number, default: Math.round(Date.now() / 1000)},
    is_deleted     : { type: Number, default: 0}
});


db.model('blog', Blog);
