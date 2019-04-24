import Record from './model/Record';
import sample from './model/sample';
import _ from 'lodash';

export default class Repository {

    constructor(_filePath: string) {
        // TODO: Implement
    }

    public getRecords(): IRecordInList[] {
        return _(sample)
            .map((r) => _.pick(r, ['id', 'name', 'type', 'yearOfRelease', 'starring', 'genre']))
            .valueOf() as IRecordInList[];
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