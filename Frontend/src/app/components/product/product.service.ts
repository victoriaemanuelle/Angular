import { HttpClient} from '@angular/common/http';
import {Component, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Product } from './product.model';

import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})


/**
 * @title Basic snack-bar
 */
@Component({
  selector: 'snackBar',
  template: 'product.service.6html',
  styleUrls: []
})
export class ProductService {
  
  baseUrl: string ="http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

    showMessage(msg: string): void {
      this.snackBar.open(msg, 'X', {
      duration:3000,
      horizontalPosition: "right",
      verticalPosition: "top"
      
    })

    }

    openSnackBar(showMessage: string, action: string) {
      this.snackBar.open(showMessage, action, {
        duration: 3000,
      })
    }

    create(product: Product): Observable<Product> {
      return this.http.post<Product>(this.baseUrl, product).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }
  
    read(): Observable<Product[]> {
      return this.http.get<Product[]>(this.baseUrl).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }
  
    readById(id: number): Observable<Product> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get<Product>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }
  
    update(product: Product): Observable<Product> {
      const url = `${this.baseUrl}/${product.id}`;
      return this.http.put<Product>(url, product).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }
  
    delete(id: number): Observable<Product> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete<Product>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }
  
    errorHandler(e: any): Observable<any> {
      this.showMessage("Ocorreu um erro!");
      return EMPTY;
    }
  }