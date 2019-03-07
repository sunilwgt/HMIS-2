import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'package'
})
export class PackagePipe implements PipeTransform {

  transform(items: any[], args?: any): any {
    return items.filter((item: any) => this.applyFilter(item, args));
  }

  applyFilter(item: any, filter: any): boolean {
    if (filter === "" || item.label.toLowerCase().indexOf(filter) === -1) {
      return false;
    }
    return true;
  }
}
