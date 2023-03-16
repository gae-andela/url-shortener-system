import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    text: string,
    reverse: boolean = false,
    length: number = 20,
    suffix: string = '...'
  ): string {
    if (!text || text.length <= length) {
      return text;
    }
    let start = 0;
    let end = length;
    let prefix = '';
    if (reverse) {
      end = text.length;
      start = end - length;
      prefix = suffix;
      suffix = '';
    }
    return prefix + text.substring(start, end).trim() + suffix;
  }
}
