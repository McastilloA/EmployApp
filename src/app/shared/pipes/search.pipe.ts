import { Pipe, type PipeTransform } from '@angular/core';
import { Employee } from '@core/interface/employees';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(
    data: any[],
    filterProperty: string,
    filter: string
  ): Array<Employee> {
    console.log('Here', data);

    const filterValue = filter.toLowerCase();
    return filterValue
      ? data.filter((item) =>
          item[filterProperty].toLowerCase().includes(filterValue)
        )
      : data;
  }
}
