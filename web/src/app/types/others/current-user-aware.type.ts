import { UserAccount } from '@src/types/models';

export interface CurrentUserAware {
  user: UserAccount | null;
  userName: string;
}
