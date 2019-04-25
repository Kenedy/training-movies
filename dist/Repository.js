"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_1 = __importDefault(require("./model/sample"));
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
const assert_1 = __importDefault(require("assert"));
const shortid_1 = __importDefault(require("shortid"));
class Repository {
    constructor(filePath) {
        this.filePath = filePath;
        console.log(`Using file ${filePath} as data storage`);
        this.loadData();
    }
    getRecords() {
        return lodash_1.default(this.data)
            .map((r) => lodash_1.default.pick(r, ['id', 'name', 'type', 'yearOfRelease', 'starring', 'genre']))
            .valueOf();
    }
    getRecordById(id) {
        return lodash_1.default(this.data).find((r) => r.id === id);
    }
    createRecord(r) {
        assert_1.default(lodash_1.default.isUndefined(r.id), 'New record should not have id. Perhaps you wanted to call update instead?');
        r.id = shortid_1.default.generate();
        this.data.push(r);
        this.saveData();
        return r;
    }
    updateRecord(r) {
        this.saveData();
        assert_1.default(lodash_1.default.isString(r.id), 'Updating record requires the record to have an id. Perhaps you wanted to call create instead?');
        throw new Error('not implemented yet');
    }
    deleteRecord(_id) {
        this.saveData();
        // TODO: Implement
        throw new Error('not implemented yet');
    }
    loadData() {
        try {
            const dataAsJson = fs_1.default.readFileSync(this.filePath, { encoding: 'utf8' });
            this.data = JSON.parse(dataAsJson);
        }
        catch (err) {
            console.error(`Failed to load or parse file ${this.filePath}. Using sample data instead.`);
            this.data = sample_1.default;
        }
    }
    saveData() {
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(this.data, null, 4));
    }
}
exports.default = Repository;
