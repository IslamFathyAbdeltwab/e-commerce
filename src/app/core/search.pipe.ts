import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayp:any[],searchterm:string):any[] {
    
    return arrayp.filter((product)=> product.title.includes(searchterm));
  }

}
