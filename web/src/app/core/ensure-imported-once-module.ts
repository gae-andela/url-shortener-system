/**
 * As stated by its name, the sole purpose of this class is to optimize
 * memory usage by avoiding loading multiple time a module.
 */
export abstract class EnsureImportedOnceModule {
  protected constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded.`
      );
    }
  }
}
