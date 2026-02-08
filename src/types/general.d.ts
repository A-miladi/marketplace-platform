export interface IState {
  id: number;
  name: string;
  cities: string | string[];
}

export interface ICountry {
  id: number;
  name: string;
  code: string;
  states?: IState[];
}

export interface ICity {
  id: number;
  name: string;
}

export interface IFilters {
  date_to?: Date | null;
  date_from?: Date | null;
  price_min?: number | null;
  price_max?: number | null;
  sort?: string | null;
  category_ids?: string | null;
  properties?:
    | Array<{
        property_definition_id: string;
        value: string | string[];
      }>
    | undefined;
}
