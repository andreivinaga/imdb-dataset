export interface IMappedTypes {
  column: string;
  parser?: (value: string) => any;
}

export interface ITitleRating {
  tconst: string;
  averageRating: number;
  numVotes: number;
}

export interface ITitleAlternate {
  titleId: string;
  ordering: number;
  title: string;
  region: string;
  language: string;
  types: string;
  attributes: string;
  isOriginalTitle: boolean;
}

export enum Genre {
  Action = 'Action',
  Adventure = 'Adventure',
  Animation = 'Animation',
  Biography = 'Biography',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Drama = 'Drama',
  Family = 'Family',
  Fantasy = 'Fantasy',
  FilmNoir = 'Film Noir',
  History = 'History',
  Horror = 'Horror',
  Music = 'Music',
  Musical = 'Musical',
  Mystery = 'Mystery',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
  Short = 'Short',
  Sport = 'Sport',
  Superhero = 'Superhero',
  Thriller = 'Thriller',
  War = 'War',
  Western = 'Western',
}

export enum TitleType {
  Short = 'short',
  Movie = 'movie',
  TVEpisode = 'tvEpisode',
  TVMovie = 'tvMovie',
  TVSeries = 'tvSeries',
  TVShort = 'tvShort',
  Video = 'video',
  TVMiniSeries = 'tvMiniSeries',
}

export interface ITitleBasic {
  tconst: string;
  titleType: TitleType;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear: number;
  endYear: number;
  runtimeMinutes: number;
  genres: Genre[];
}

export interface ITitleCrew {
  tconst: string;
  directors: string[];
  writers: string[];
}

export interface ITitleEpisode {
  tconst: string;
  parentTconst: string;
  seasonNumber: number;
  episodeNumber: number;
}

export interface ITitlePrincipal {
  tconst: string;
  ordering: number;
  nconst: string;
  category: string;
  job: string;
  characters: string;
}

export interface INameBasic {
  nconst: string;
  primaryName: string;
  birthYear: number;
  deathYear: number;
  primaryProfession: string[];
  knownForTitles: string[];
}
