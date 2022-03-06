import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensitiveService {

  // Observable sources
  private user = new BehaviorSubject<any>(null);
  // Onservable streams
  user$ = this.user.asObservable();

  constructor() { }

  public get currentUserValue(): any {
    return this.user.value;
  }
  confirmUser(user: any) {
    this.user.next(user);
  }
}
