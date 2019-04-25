import sample from './model/sample';
import _ from 'lodash';
import fs from 'fs';
import assert from 'assert';
import shortid from 'shortid';

export default class Repository {
    private data: IRecord[];

    constructor(private filePath: string) {
        console.log(`Using file ${filePath} as data storage`);
        this.loadData();
    }

    public getRecords(): IRecordInList[] {
        return _(this.data)
            .map((r) => _.pick(r, ['id', 'name', 'type', 'yearOfRelease', 'starring', 'genre']))
            .valueOf() as IRecordInList[];
    }

    public getRecordById(id: string): IRecord|undefined {
        return _(this.data).find((r) => r.id === id);
    }

    public createRecord(r: IRecord): IRecord {
        assert(_.isUndefined(r.id), 'New record should not have id. Perhaps you wanted to call update instead?');
        r.id = shortid.generate();
        this.data.push(r);
        this.saveData();
        return r;
    }

    public updateRecord(r: IRecord): IRecord {
        this.saveData();
        assert(_.isString(r.id), 'Updating record requires the record to have an id. Perhaps you wanted to call create instead?');

        throw new Error('not implemented yet');
    }

    public deleteRecord(_id: string): void {
        this.saveData();
        // TODO: Implement
        throw new Error('not implemented yet');
    }

    private loadData(): void {
        try {
            const dataAsJson = fs.readFileSync(this.filePath, { encoding: 'utf8'});
            this.data = JSON.parse(dataAsJson);
        } catch (err) {
            console.error(`Failed to load or parse file ${this.filePath}. Using sample data instead.`);
            this.data = sample;
        }
    }

    private saveData(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 4));
    }
}