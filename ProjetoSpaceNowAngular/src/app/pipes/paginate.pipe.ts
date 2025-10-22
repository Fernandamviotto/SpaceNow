import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: true,
})
export class PaginatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // stub: return the array unchanged; components using pagination controls expect an iterable
    return value;
  }
}
