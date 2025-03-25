export interface missingPerson {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  vivo: boolean;
  urlFoto?: null;
  ultimaOcorrencia: lastOccurence;
}

export interface lastOccurence {
  dtDesaparecimento: string;
  dataLocalizacao?: null;
  encontradoVivo: boolean;
  localDesaparecimentoConcat: string;
  ocorrenciaEntrevDesapDTO: missingPersonDetail;
  listaCartaz?: null;
  ocoId: number;
}

interface missingPersonDetail {
  informacao: string;
  vestimentasDesaparecido: string;
}

export interface missingAndFoundNumbers {
  missingNumber: number;
  foundNumber: number;
}
