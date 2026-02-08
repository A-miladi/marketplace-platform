import { City } from "./advertisement";

export type Side = "BUYER" | "SELLER" | "BOTH";

export type ProfileStatus = "PENDING" | "BLOCKED" | "VERIFIED";

export type UserRole = "USER" | "COMPANY" | "ADMIN";

export type Role = "USER" | "COMPANY";

export interface Profile {
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  birth_date: string;
  address: string;
  zip_code: string;
  city: City;
  city_id: string;
  email_verified_at: string;
  phone_verified_at: string | null;
  phone_number: string | null;
  is_verified: boolean | null;
  // Company-specific fields
  role?: string;
  company_name?: string;
  side?: Side;
  is_email_subscribed?: boolean;
  status?: ProfileStatus;
}

export interface User {
  id: number;
  email: string;
  role: UserRole;
  phone_number: string | null;
  profile: Profile;
  created_at: string;
  updated_at: string;
  rate: number | null;
}

export interface ExtraData {
  hear_about_us: string;
  brand_priority: string;
  budget: string;
  equipment_type: string;
  suggestions: string;
  purchase_schedule: string;
}

export interface CompanyProfile extends Profile {
  side: Side;
  role: string;
  company_name: string;
  is_email_subscribed: boolean;
  extra_data: ExtraData;
}

export interface Company {
  id: number;
  email: string;
  phone_number: string | null;
  role: UserRole;
  profile: CompanyProfile;
  created_at: string;
  updated_at: string;
  rate: number | string | null;
}

export interface UpdateProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country?: string;
  address: string;
  city_id: number;
  zip_code: string;
}

export interface IUserInfoFeed {
  id: string;
  full_name: string;
  avatar: string;
}

export interface IUserFeed {
  id: string;
  text: string;
  rating?: number;
  user: IUserInfoFeed;
  commented_user: IUserInfoFeed;
  created_at: string;
  updated_at: string;
}

export interface SendVerification {
  value: string | number;
  type: "EMAIL" | "PHONE";
}

export interface VerificationRequest extends SendVerification {
  code: string;
}
export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  address: string;
  zip_code: string;
  birth_date: string;
}

export interface UpdateCompanyRequest {
  first_name: string;
  last_name: string;
  address: string;
  zip_code: string;
  company_name: string;
  side: Side;
  role: string;
  is_email_subscribed?: boolean;
  extra_data?: ExtraData;
}

export interface IVerifyDeleteAccount {
  code: string;
}

export interface AddCommentRequest {
  rating: number;
  text: string;
  user_id: number;
}

export interface ICompanyUpdateStatus {
  is_verified: boolean;
  rejection_message?: string;
}
