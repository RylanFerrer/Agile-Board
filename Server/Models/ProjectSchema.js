const mongoose = require('mongoose');
const ProjectSchema = {
    users: Array,
    tasks: Object,
    columns: Object,
    columnOrder: Array,
    projectName: String
}

module.exports = mongoose.model("Project",ProjectSchema)