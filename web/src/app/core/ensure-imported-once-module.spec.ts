import { Optional, SkipSelf } from '@angular/core';
import { EnsureImportedOnceModule } from './ensure-imported-once-module';

describe('EnsureImportedOnceModule', () => {
  it('should create a single instance', () => {
    // Module not yet loaded
    expect(new FakeSingletonModule()).toBeTruthy();

    // Module already loaded
    expect(() => new FakeSingletonModule({})).toThrowError();
  });
});

class FakeSingletonModule extends EnsureImportedOnceModule {
  public constructor(@SkipSelf() @Optional() parent?: FakeSingletonModule) {
    super(parent);
  }
}
