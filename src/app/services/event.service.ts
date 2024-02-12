import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../services/event.model';

// Service for managing events
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private savedEvents: Event[] = [];
  private savedEventsSubject = new BehaviorSubject<Event[]>([]);

  constructor() {
    this.loadEvents();
  }

  // Method to add a event
  addEvent(event: Event) {
    event.addedTimestamp = new Date().getTime();
    const index = this.savedEvents.findIndex(
      (e) => e.eventname === event.eventname && e.location === event.location
    );
    if (index === -1) {
      this.savedEvents.push(event);
      this.savedEventsSubject.next(this.savedEvents);
    }
    this.saveEvents();
  }

  // Method to remove an event
  removeEvent(event: Event) {
    this.savedEvents = this.savedEvents.filter(
      (e) => e.eventname !== event.eventname || e.location !== event.location
    );
    this.savedEventsSubject.next(this.savedEvents);
    this.saveEvents();
  }

  getEventsObservable() {
    return this.savedEventsSubject.asObservable();
  }

  isEventSaved(event: Event): boolean {
    return this.savedEvents.some(e => e.eventname === event.eventname && e.location === event.location);
  }
  private saveEvents() {
    localStorage.setItem('favorites', JSON.stringify(this.savedEvents));
  }

   loadEvents() {
    const storedEvents = localStorage.getItem('favorites');
    if (storedEvents) {
      this.savedEvents = JSON.parse(storedEvents);
      this.savedEventsSubject.next(this.savedEvents);
    }
  }
}
