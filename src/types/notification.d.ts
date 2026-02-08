import { Status } from "./advertisement";

export type NotificationStatus = "READ" | "UNREAD";

export type NotificationType = "MESSAGE" | "AD" | "SYSTEM";

export interface NotificationExtraData {
  ad_id?: number;
  status: Status;
  rejection_msg: string;
  user: {
    first_name: string;
    last_name: string;
    avatar: string;
    id: number;
  };
}

export interface INotification {
  id: string;
  read: boolean;
  message: string;
  type: NotificationType;

  extra_data: NotificationExtraData;
  created_at: string;
}

export interface ReadNotificationRequest {
  notification_id: number | null;
}
