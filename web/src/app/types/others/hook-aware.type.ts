import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export interface HookAware extends OnInit, AfterViewInit, OnDestroy {
  destroyed$: Subject<void>;
}
