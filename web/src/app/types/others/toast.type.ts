import { ToastAriaLive, ToastType } from '@src/types/enums';

export interface Toast {
  id: number;

  title: string;
  message: string;
  type: ToastType;

  delay: number;
  ariaLive: ToastAriaLive;
  autoHide: boolean;
}
