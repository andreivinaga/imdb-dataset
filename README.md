# imdb-dataset
Parse data coming from https://www.imdb.com/interfaces/

This library works only with .tsv files, it will read the file line by line and return a mapped object.

[List with types of objects](src/types.ts)

[List with parsers](src/columns.ts)

[List with parsers](test/test.spec.ts)

Usage:
```javascript
import {
  ITitleRating,
  mappedTitleBasic,
  TSVParser,
} from 'imdb-dataset';

const parser = new TSVParser<ITitleRating>({
  filePath: '<absolute-file-path>.tsv',
  columns: mappedTitleBasic,
});

async function test() {
  for await (const rating of parser) {
    console.log(rating);
  }
}

test().catch(console.log);
```
