export interface Municipio {
  index: number;
  comunidad: string;
  provincia: string;
  municipio: string;
  municipioDestructure: string;
  codnut2: string;
  codnut3: string;
}

export interface Codnut<T> {
  codnut: 'ES'
}