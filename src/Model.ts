import { getCols } from './util';
import { IMappedTypes } from './types';

const nulledValues = ['\\N'];

export class Model<T extends {}> {

  private readonly _headerColumns: IMappedTypes[];

  constructor(headerColumns: IMappedTypes[]) {
    this._headerColumns = headerColumns;
  }

  parseLine(line: string): T {
    const cols = getCols(line);

    const parsedLine: any = {};
    this._headerColumns.forEach((columnParser, index) => {
      const { column, parser } = columnParser;

      const value = cols[index];
      if (nulledValues.includes(value)) {
        parsedLine[column] = null;
        return;
      }

      if (parser) {
        parsedLine[column] = parser(cols[index]);
        return;
      }

      parsedLine[column] = value;
    });

    return parsedLine;
  }

}
