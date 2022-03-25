import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl: string;
  private imageUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://pokeapi.co/api/v2';
    this.imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  }

  getPokemons(offset = 0, limit = 20, type = 'pokemon') {
    const url = `${this.baseUrl}/${type}?offset=${offset}&limit=${limit}`;
    return this.httpClient.get(url).pipe(
      map((res:any) => res['results']),
      map(pokemons => pokemons.map((poke:any, index:any) => {
        poke.index = offset + index + 1;
        poke.image = this.getPokeImage(poke.index);
        return poke;
      })), retry(1)
    );
  }
  getPokeImage(index: number) {
    return `${this.imageUrl}${index}.png`;
  }
  getDetails(index: number) {
    return this.httpClient.get(`${this.baseUrl}/pokemon/${index}`).pipe(
      map((poke:any) => {
        const sprites = Object.keys(poke['sprites']);
       poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }
}
