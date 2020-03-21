import { default as es, MapStream } from 'event-stream';
import { createReadStream, existsSync } from 'fs';

import { sleep } from './util';
import { Model } from './Model';
import { IMappedTypes } from './types';

export enum IteratorState {
  NA,
  FINISHED,
  WORKING,
}

export interface ITSVParserOptions<T> {
  model?: Model<T>;
  columns?: IMappedTypes[];
  filePath: string;
}

export class TSVParser<T> implements AsyncIterable<T> {

  private stream: MapStream;
  private lines: T[] = [];
  private maxLines = 100;
  private state: IteratorState = IteratorState.NA;

  private model: Model<T>;

  constructor(options: ITSVParserOptions<T>) {
    const { filePath, model, columns } = options;

    if (!existsSync(filePath)) {
      throw new Error(`Cannot find file at path: ${filePath}`);
    }

    if (!model) {
      if (!columns) {
        throw new Error('If a model is not specified please specify columns for standard model');
      }
      this.model = new Model<T>(columns);
    } else {
      this.model = model;
    }

    this.state = IteratorState.WORKING;

    this.stream = createReadStream(filePath)
      .pipe(es.split())
      .pipe(this.onLine)
      .on('close', () => {
        this.state = IteratorState.FINISHED;
      });
  }

  private onLine = es.mapSync((line: string) => {
    if (!line) {
      return;
    }

    const parsedLine = this.model.parseLine(line);
    this.lines.push(parsedLine);

    if (this.lines.length === this.maxLines) {
      this.stream.pause();
    }
  });

  private getLine(): T {
    const line = this.lines.shift();
    if (!line) {
      throw new Error('Cannot get line');
    }

    return line;
  }

  private isEmpty() {
    return this.lines.length === 0;
  }

  public async next(): Promise<IteratorResult<T>> {
    if (this.isEmpty()) {
      this.stream.resume();
      await this.waitForNewLines();
    }

    return new Promise((resolve, reject) => {
      if (this.finished) {
        return resolve({
          value: null,
          done: true,
        });
      }

      resolve({
        value: this.getLine(),
        done: false,
      });
    });
  }

  private async waitForNewLines(): Promise<void> {
    while (this.lines.length === 0) {
      if (this.finished) {
        return;
      }
      await sleep(5);
    }
  }

  private get finished() {
    return this.state === IteratorState.FINISHED && this.lines.length === 0;
  }

  public [Symbol.asyncIterator](): AsyncIterableIterator<any> { // tslint:disable-line
    return this;
  }

}
