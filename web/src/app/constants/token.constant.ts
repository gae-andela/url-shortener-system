import { InjectionToken } from '@angular/core';

/**
 * That way, we can efficiently use browser "window" methods and mock its value in unit tests
 */
export const WINDOW_TOKEN = new InjectionToken<Window>('Window');
