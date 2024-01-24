import { IMappedTypes } from './types';

function splitArray(value: string) {
  return value.split(',');
}

export const mappedTitleRating: IMappedTypes[] = [
  {
    column: 'tconst',
  },
  {
    column: 'averageRating',
    parser: parseFloat,
  },
  {
    column: 'numVotes',
    parser: parseInt,
  },
];

export const mappedTitleAlternate: IMappedTypes[] = [
  {
    column: 'titleId',
  },
  {
    column: 'ordering',
    parser: parseInt,
  },
  {
    column: 'title',
  },
  {
    column: 'region',
  },
  {
    column: 'language',
  },
  {
    column: 'types',
  },
  {
    column: 'attributes',
  },
  {
    column: 'isOriginalTitle',
    parser: Boolean,
  },
];

export const mappedTitleBasic: IMappedTypes[] = [
  {
    column: 'tconst',
  },
  {
    column: 'titleType',
  },
  {
    column: 'primaryTitle',
  },
  {
    column: 'originalTitle',
  },
  {
    column: 'isAdult',
    parser: (input) => input === '1',
  },
  {
    column: 'startYear',
    parser: parseInt,
  },
  {
    column: 'endYear',
    parser: parseInt,
  },
  {
    column: 'runtimeMinutes',
    parser: parseInt,
  },
  {
    column: 'genres',
    parser: splitArray,
  },
];

export const mappedTitleCrew: IMappedTypes[] = [
  {
    column: 'tconst',
  },
  {
    column: 'directors',
    parser: splitArray,
  },
  {
    column: 'writers',
    parser: splitArray,
  },
];

export const mappedTitleEpisode: IMappedTypes[] = [
  {
    column: 'tconst',
  },
  {
    column: 'parentTconst',
  },
  {
    column: 'seasonNumber',
    parser: parseInt,
  },
  {
    column: 'episodeNumber',
    parser: parseInt,
  },
];

export const mappedTitlePrincipal: IMappedTypes[] = [
  {
    column: 'tconst',
  },
  {
    column: 'ordering',
    parser: parseInt,
  },
  {
    column: 'nconst',
  },
  {
    column: 'category',
  },
  {
    column: 'job',
  },
  {
    column: 'characters',
  },
];

export const mappedNameBasic: IMappedTypes[] = [
  {
    column: 'nconst',
  },
  {
    column: 'primaryName',
  },
  {
    column: 'birthYear',
    parser: parseInt,
  },
  {
    column: 'deathYear',
    parser: parseInt,
  },
  {
    column: 'primaryProfession',
    parser: splitArray,
  },
  {
    column: 'knownForTitles',
    parser: splitArray,
  },
];
