const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
    .route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end('Will return all leaders to you');
    })

    .post((req, res, next) => {
        res.end(`Will post new leader: ${req.body.leaderName} and ${req.body.leaderDescription}`);
    })

    .put((req, res, next) => {
        res.end('PUT opeation not supported on /leaders');
    })

    .delete((req, res, next) => {
        res.end(`Will delete all leaders`);
    });

leaderRouter
    .route('/:leaderId')

    .get((req, res, next) => {
        res.end(`Will return info for leader id ${req.params.leaderId}`);
    })

    .post((req, res, next) => {
        res.end(`Will add the leader id ${req.params.leaderId}`);
    })

    .put((req, res, next) => {
        res.end(`Will update the leader id ${req.params.leaderId}`);
    })

    .delete((req, res, next) => {
        res.end(`Will delete the leader id ${req.params.leaderId}`);
    });

module.exports = leaderRouter;
