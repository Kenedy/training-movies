"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Repository_1 = __importDefault(require("./Repository"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const repo = new Repository_1.default(path_1.default.resolve(__dirname, '../data.json'));
// CORS
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-CSRFToken');
    res.header('Access-Control-Expose-Headers', 'X-CSRFToken');
    next();
});
app.get('/', (_req, res) => res.send(`For API description see https://github.com/Kenedy/training-movies`));
app.get('/list', (_req, res) => {
    try {
        const records = repo.getRecords();
        res.send(records);
    }
    catch (err) {
        res.status(500).send({ error: err && err.message });
    }
});
app.get('/record', (req, res) => {
    try {
        const id = req.query.id;
        if (!lodash_1.default.isString(id)) {
            res.status(400).send({ error: 'Expecting valid parameter id in url' });
        }
        else {
            const record = repo.getRecordById(id);
            if (!record) {
                res.status(404).send(`Unable to find record with id ${id}`);
            }
            else {
                res.send(record);
            }
        }
    }
    catch (err) {
        res.status(500).send({ error: err && err.message });
    }
});
app.listen(8080, () => console.log('training-movies backend listening on port 8080'));
