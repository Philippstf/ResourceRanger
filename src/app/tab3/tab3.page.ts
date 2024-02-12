import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../services/event.service';
import { Event } from '../services/event.model';
import { Subscription } from 'rxjs';


// Component for the Tab3-Page
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

// Defines the main functionality of the favorite events page.
export class Tab3Page implements OnInit, OnDestroy {
  savedEvents: Event[] = [];
  private eventsSubscription: Subscription | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // Load saved events and subscribe to changes
    this.eventService.loadEvents();
    this.eventsSubscription = this.eventService.getEventsObservable().subscribe((events) => {
    this.savedEvents = events;
    this.sortByDefault();
    });
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  removeEvent(event: Event) {
    this.eventService.removeEvent(event);
  }

  currentSortMode = 'default';

    // Method to sort saved events by date
    sortEventsByDate() {
      if (this.currentSortMode === 'date') {
        this.sortByDefault();
      } else {
        this.currentSortMode = 'date';
        this.savedEvents.sort((a, b) => new Date(a.date_time).getTime() - new Date(b.date_time).getTime());
      }
    }

    // Method to sort saved events by default (event name)
    sortByDefault() {
    this.currentSortMode = 'default';
    this.savedEvents.sort((a, b) => a.eventname.localeCompare(b.eventname));
  } 
}


