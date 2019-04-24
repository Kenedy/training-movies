import Record from './model/Record';
import sample from './model/sample';
import _ from 'lodash';
// import shortid from 'shortid';

export default class Repository {
    private data: IRecord[];

    constructor(filePath: string) {
        // TODO: Implement
        this.loadData(filePath);
    }

    public getRecords(): IRecordInList[] {
        return _(this.data)
            .map((r) => _.pick(r, ['id', 'name', 'type', 'yearOfRelease', 'starring', 'genre']))
            .valueOf() as IRecordInList[];
    }

    public getRecordById(id: string): Record|undefined {
        return _(this.data).find((r) => r.id === id);
    }

    public createRecord(_r: Record): Record {
        this.saveData();
        // TODO: Implement
        throw new Error('not implemented yet');
    }

    public updateRecord(_r: Record): Record {
        this.saveData();
        // TODO: Implement
        throw new Error('not implemented yet');
    }

    public deleteRecord(_id: string): void {
        this.saveData();
        // TODO: Implement
        throw new Error('not implemented yet');
    }

    private loadData(_filePath: string): void {
        // TODO: Implement
        this.data = sample;
    }

    private saveData(): void {
        // TODO: Implement
    }
}