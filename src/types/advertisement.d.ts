import { CategoryProperties, ICategory } from "./category";
import { User } from "./user";

interface LocationLatLng {
  lat: number;
  lng: number;
}

interface State {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
  code: string;
}

interface City {
  id: number;
  name: string;
  state: State;
  country: Country;
}

export type Status = "PENDING" | "APPROVED" | "REJECTED";

export type Currency = "USD" | "EURO";

export type AdvertisementProperty = {
  id: number;
  property_definition: CategoryProperties;
  value: string | number;
};

export interface IAdvertisement {
  id: number;
  address: string;
  images: string[];
  is_bookmarked: false;
  price: number;
  title: string;
  description: string;
  slug: string;
  status: Status;
  user: User;
  currency: Currency;
  category: ICategory;
  city: City;
  properties: AdvertisementProperty[];
  created_at: string;
  updated_at: string;
  show_phone: boolean;
  location: LocationLatLng;
  zip_code: string;
  address: string;
}

export interface IGetAdvertisements {
  data: IAdvertisement[];
}

export interface CategoryProperty {
  property_definition_id: number;
  value: string | number | string[];
}

export interface SelectCategoryProperty extends CategoryProperty {
  value: string | string[];
}

export type AdvertisementFormData = {
  title: string;
  price: number;
  description: string;
  category_id: number;
  zip_code: string;
  address: string;
  properties?: CategoryProperty[];
};

export type AdvertisementFormValues = AdvertisementFormData & {
  images: File[];
  location?: Location;
};

export interface BookMarkRequest {
  ad_id: number;
}

export type GetBookmarkAdvertisement = {
  id: string;
  ad: IAdvertisement;
};
