import { FormGroup } from '@angular/forms';
import { FormAware, GConstructor } from '@src/types/others';

/**
 * Mixin class making some useful form methods available to component
 */
export const WithForm = <T extends GConstructor>(base: any = class {} as T) =>
  class extends base implements FormAware {
    formGroup!: FormGroup;

    constructor(...args: any[]) {
      super(...args);
    }

    isFieldValid(field: string): boolean {
      const control = this.formGroup.get(field);
      if (!control) {
        return false;
      }
      return control.pristine || control.valid;
    }

    fieldClasses(field: string): Record<string, boolean> {
      const valid = this.isFieldValid(field);
      return {
        'is-invalid': !valid,
      };
    }
  };
