'use strict';

const server = require('./api/server');
const mongoose = require('mongoose')

const { PORT, DB_URI } = require('./api/utils/constants');

mongoose.connect(MONGODB_URI)

server.listen(PORT, async () => {
    await mongoose.connect(DB_URI)
    console.log(`App listening on port ${PORT}`)
});
