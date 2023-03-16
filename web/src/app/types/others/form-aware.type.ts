import { FormGroup } from '@angular/forms';

export interface FormAware {
  formGroup: FormGroup;

  isFieldValid(field: string): boolean;

  fieldClasses(field: string): Record<string, boolean>;
}
