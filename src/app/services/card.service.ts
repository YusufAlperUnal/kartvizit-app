import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Card} from "../models/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>('https://jsonplaceholder.typicode.com/users');
  }
  addCard(card:Card){
     return this.http.post('https://jsonplaceholder.typicode.com/users',card);
  }
  updateCard(card:Card , cardId:number): Observable<any>{
    return this.http.put('https://jsonplaceholder.typicode.com/users/'+ cardId,card);
  }


  deleteCard(card: Card): Observable<any>{
    return this.http.delete('https://jsonplaceholder.typicode.com/users');

  }
}
