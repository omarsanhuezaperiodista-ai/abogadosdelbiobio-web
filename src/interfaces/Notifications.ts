import { AlertColor } from '@mui/material';

export interface INotification {
  message: string;
  color: AlertColor;
}

export interface INotificationState {
  notifications: INotification[];
}
