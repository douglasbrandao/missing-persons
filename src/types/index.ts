export interface MissingAndFoundNumbers {
  missingNumber: number;
  foundNumber: number;
}

export interface Filters {
  nome?: string
  sexo?: string,
  faixaIdadeInicial?: string,
  faixaIdadeFinal?: string,
  status?: string,
  page?: string,
  perPage?: string
}

export interface MissingPersonsResponse {
  totalPages: number
  totalElements: number
  pageable: Pageable
  numberOfElements: number
  first: boolean
  last: boolean
  size: number
  content: MissingPerson[]
  number: number
  sort: Sort
  empty: boolean
}

export interface MissingPerson {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  vivo: boolean;
  urlFoto?: string;
  ultimaOcorrencia: LastOccurence;
}

export interface LastOccurence {
  dtDesaparecimento: string;
  dataLocalizacao: Date;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: MissingPersonDetail;
  listaCartaz?: null;
  ocoId: number;
}

interface Sort {
  unsorted: boolean
  sorted: boolean
  empty: boolean
}

interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  unpaged: boolean
  paged: boolean
}

interface MissingPersonDetail {
  informacao: string;
  vestimentasDesaparecido: string;
}