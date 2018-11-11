'use strict';

const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res, next) => {
    const message = `<h1>Example App</h1>`;
    res.send(message);
  });

exports.router = router;
