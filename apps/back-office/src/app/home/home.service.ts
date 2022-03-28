import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  get(str: string) {
    console.log(str)
  }
}
