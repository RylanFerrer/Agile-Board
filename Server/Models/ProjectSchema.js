const mongoose = require('mongoose');
const ProjectSchema = {
    users: Array,
    tasks: Object,
    columns: Object,
    columnOrder: Array
}

module.exports = mongoose.model("ProjectSchema",ProjectSchema)