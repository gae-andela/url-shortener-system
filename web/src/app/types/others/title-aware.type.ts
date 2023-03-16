import { Subject } from 'rxjs';

export interface TitleAware {
  title: string;
  description: string | null;
  title$: Subject<string>;
}
