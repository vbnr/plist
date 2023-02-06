import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subStr',
})
export class SubStrPipe implements PipeTransform {
  transform(value: string, end = 80): string {
    if (value.length > end) {
      return `${value.substring(0, end)}...`;
    }

    return value;
  }
}
