"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_1 = __importDefault(require("./model/sample"));
const lodash_1 = __importDefault(require("lodash"));
// import shortid from 'shortid';
class Repository {
    constructor(filePath) {
        // TODO: Implement
        this.loadData(filePath);
    }
    getRecords() {
        return lodash_1.default(this.data)
            .map((r) => lodash_1.default.pick(r, ['id', 'name', 'type', 'yearOfRelease', 'starring', 'genre']))
            .valueOf();
    }
    getRecordById(id) {
        return lodash_1.default(this.data).find((r) => r.id === id);
    }
    createRecord(_r) {
        this.saveData();
        // TODO: Implement
        throw new Error('not implemented yet');
    }
    updateRecord(_r) {
        this.saveData();
        // TODO: Implement
        throw new Error('not implemented yet');
    }
    deleteRecord(_id) {
        this.saveData();
        // TODO: Implement
        throw new Error('not implemented yet');
    }
    loadData(_filePath) {
        // TODO: Implement
        this.data = sample_1.default;
    }
    saveData() {
        // TODO: Implement
    }
}
exports.default = Repository;
