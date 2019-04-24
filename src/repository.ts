import Record from './model/Record';

export default class Repository {
    public getRecords(): Record[] {
        throw new Error('not implemented yet');
    }

    public getRecordById(_id: string): Record|null {
        throw new Error('not implemented yet');
    }

    public createRecord(_r: Record): Record {
        throw new Error('not implemented yet');
    }

    public updateRecord(_r: Record): Record {
        throw new Error('not implemented yet');
    }

    public deleteRecord(_id: string): void {
        throw new Error('not implemented yet');
    }
}