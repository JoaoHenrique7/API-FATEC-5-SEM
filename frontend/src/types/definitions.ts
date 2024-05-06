/**
 * HTTP
 * --- --- --- --- --- --- --- --- --- ---
 */
export type HTTPError = {
    error: string;
    [key: string]: any;
}

/**
 * Models
 * --- --- --- --- --- --- --- --- --- ---
 */
export type User = {
    _id: string;
    nome: string;
    email: string;
    senha: string;
    tipo: string;
}

export type Partner = {
    _id: string;
    name: string;
    email: string;
    cpfcnpj: string;
    tipo: string;
    expertises: BaseCertificate[];
}

export type BaseCertificate = {
    name: string;
    track: string;
    qualifiers: string[];
}