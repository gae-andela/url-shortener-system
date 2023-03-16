import { GConstructor } from '@src/types/others';

/**
 * Look for argument of given Type in injected instances.
 *
 * @param args the parameters received by a component constructor
 * @param type the targeted type
 * @param mandatory if true, will throw an error if type has not been found in arguments
 * @returns the corresponding instance (if exists).
 */
export const findArgOfType = <T>(
  args: any[],
  type: GConstructor<T>,
  mandatory: boolean = true
): T => {
  const find = args.find((arg) => arg instanceof type);
  if (!find && mandatory) {
    throw new Error(
      `Extending class must have ${type.name} injected in constructor.`
    );
  }
  return find;
};
