import assert from 'assert';

import {
  INameBasic,
  ITitleAlternate,
  ITitleBasic,
  ITitleCrew,
  ITitleEpisode,
  ITitlePrincipal,
  ITitleRating,
  mappedNameBasic,
  mappedTitleAlternate,
  mappedTitleBasic,
  mappedTitleCrew,
  mappedTitleEpisode,
  mappedTitlePrincipal,
  mappedTitleRating,
  TSVParser,
} from '../src';

function getFilePath(path: string): string {
  return `${__dirname}/files/${path}`;
}

describe('imdb dataset', () => {

  const lines = 8;

  it('should parse the ratings dataset', async () => {
    const parser = new TSVParser<ITitleRating>({
      filePath: getFilePath('title.ratings.tsv'),
      columns: mappedTitleRating,
    });

    let i = 0;
    for await (const rating of parser) {
      assert(rating.tconst);
      assert(rating.averageRating);
      assert(rating.numVotes);
      i++;
    }

    assert.strictEqual(lines, i);
  });

  it('should parse the basics dataset', async () => {
    const parser = new TSVParser<ITitleBasic>({
      filePath: getFilePath('title.basics.tsv'),
      columns: mappedTitleBasic,
    });

    let i = 0;
    for await (const basic of parser) {
      assert(basic.tconst);
      assert(basic.titleType);
      assert(basic.primaryTitle);
      assert(basic.originalTitle);
      i++;
    }

    assert.strictEqual(lines, i);
  });

  it('should parse the akas dataset', async () => {
    const parser = new TSVParser<ITitleAlternate>({
      filePath: getFilePath('title.akas.tsv'),
      columns: mappedTitleAlternate,
    });

    let i = 0;
    for await (const alternate of parser) {
      assert(alternate.titleId);
      assert(alternate.ordering);
      i++;
    }

    assert.strictEqual(lines, i);
  });

  it('should parse the crew dataset', async () => {
    const parser = new TSVParser<ITitleCrew>({
      filePath: getFilePath('title.crew.tsv'),
      columns: mappedTitleCrew,
    });

    let i = 0;
    for await (const crew of parser) {
      assert(crew.tconst);
      i++;
    }

    assert.strictEqual(lines, i);
  });

  it('should parse the episode dataset', async () => {
    const parser = new TSVParser<ITitleEpisode>({
      filePath: getFilePath('title.episode.tsv'),
      columns: mappedTitleEpisode,
    });

    let i = 0;
    for await (const episode of parser) {
      assert(episode.tconst);
      assert(episode.parentTconst);
      i++;
    }

    assert.strictEqual(lines, i);
  });

  it('should parse the principal dataset', async () => {
    const parser = new TSVParser<ITitlePrincipal>({
      filePath: getFilePath('title.pricipals.tsv'),
      columns: mappedTitlePrincipal,
    });

    let i = 0;
    for await (const principal of parser) {
      assert(principal.tconst);
      assert(principal.ordering);
      assert(principal.nconst);
      i++;
    }

    assert.strictEqual(lines, i);
  });

  it('should parse the name dataset', async () => {
    const parser = new TSVParser<INameBasic>({
      filePath: getFilePath('name.basics.tsv'),
      columns: mappedNameBasic,
    });

    let i = 0;
    for await (const principal of parser) {
      assert(principal.primaryName);
      assert(principal.birthYear);
      assert(principal.nconst);
      i++;
    }

    assert.strictEqual(lines, i);
  });

});