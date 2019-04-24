"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortid_1 = __importDefault(require("shortid"));
const Repository_1 = __importDefault(require("./Repository"));
const app = express_1.default();
const repo = new Repository_1.default('data.json');
// CORS
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-CSRFToken');
    res.header('Access-Control-Expose-Headers', 'X-CSRFToken');
    next();
});
app.get('/', (_req, res) => res.send(`hic sunt leones ${shortid_1.default.generate()}`));
app.get('/list', (_req, res) => {
    try {
        const records = repo.getRecords();
        console.log(records);
        res.send(records);
    }
    catch (err) {
        res.status(500);
        res.send({ error: err && err.message });
    }
});
app.listen(8080, () => console.log('training-movies backend listening on port 8080'));
