import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) { return "" };

    return value
      .toLocaleLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
      .join(' ');
  }

}
