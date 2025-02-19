import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagesCount'
})
export class PagesCountPipe implements PipeTransform {

  transform(value: any[], itemsPerPage: number = 5): number[] {
    if (Array.isArray(value) && value.length) {
      const pagesCount = Math.ceil(value.length / itemsPerPage);
      return Array.from({ length: pagesCount }, (_, i) => i + 1);
    }
    return [];
  }

}
