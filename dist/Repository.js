"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sample_1 = __importDefault(require("./model/sample"));
const lodash_1 = __importDefault(require("lodash"));
class Repository {
    constructor(_filePath) {
        // TODO: Implement
    }
    getRecords() {
        return lodash_1.default(sample_1.default)
            .map((r) => lodash_1.default.pick(r, ['id', 'name', 'type', 'yearOfRelease', 'starring', 'genre']))
            .valueOf();
    }
    getRecordById(_id) {
        throw new Error('not implemented yet');
    }
    createRecord(_r) {
        throw new Error('not implemented yet');
    }
    updateRecord(_r) {
        throw new Error('not implemented yet');
    }
    deleteRecord(_id) {
        throw new Error('not implemented yet');
    }
}
exports.default = Repository;
