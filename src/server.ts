import express from 'express';
import shortid from 'shortid';
import Repository from './Repository';

const app = express();
const repo = new Repository('data.json');

// CORS
app.use(function(_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-CSRFToken');
    res.header('Access-Control-Expose-Headers', 'X-CSRFToken');
    next();
});

app.get('/', (_req, res) => res.send(`hic sunt leones ${shortid.generate()}`) );

app.get('/list', (_req, res) => {
    try {
        const records = repo.getRecords();
        console.log(records);
        res.send(records);
    } catch (err) {
        res.status(500);
        res.send({error: err && (err as Error).message});
    }
});

app.listen(8080, () => console.log('training-movies backend listening on port 8080'));
