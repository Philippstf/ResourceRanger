import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../services/event.service';
import { Event } from '../services/event.model';

/// <reference types="@types/googlemaps" />

// Component for the Tab2-Page
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
  public showPopup = false;
  public selectedEvent: Event | null = null;

  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map!: google.maps.Map;
  events: Event[] = [];

  constructor(
    private http: HttpClient,
    public eventService: EventService
  ) {}

  ngOnInit() {
    // Load Google Maps API and initialize the map
    this.loadGoogleMapsApi().then(() => {
      this.initMap();
      this.loadEventData();
    }).catch((error: unknown) => {
      console.error('Fehler beim Laden der Google Maps API:', error);
    });
  }

  // Method to load the Google Maps API
  loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.defer = true;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => resolve();
      script.onerror = () => reject();

    });
  }

  // Method to initialize the map
  initMap() {
    const coords = new google.maps.LatLng(53.5511, 9.9937);
    const mapOptions = {
      zoom: 8,
      center: coords,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true, 
      zoomControl: true, 
      streetViewControl: false, 
      fullscreenControl: false, 
      mapTypeControl: false, 
    };
  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  // Method to load event data from a JSON fil
  loadEventData() {
    this.http.get<Event[]>('assets/collected_events.json').subscribe(data => {
      this.events = data;
      this.addMarkers();
    }, (error: HttpErrorResponse) => {
      console.error('Fehler beim Laden der Eventdaten:', error.message);
    });
  }

  // Method to add markers to the map for each event
  addMarkers() {
    const geocoder = new google.maps.Geocoder();
    this.events.forEach((event, index) => {
      geocoder.geocode({ 'address': event.location }, (results, status) => {
        if (status === 'OK') {
          const marker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location,
          });

          marker.addListener('click', () => {
            this.openPopup(event);
            this.map.setCenter(results[0].geometry.location); 
            this.map.setZoom(15); 
          });

        } else {
          console.error('Geocode war nicht erfolgreich aus folgendem Grund:', status);
        }
      });
    });
  }

   // Method to add event and remove event from favorites
  toggleFavorite(event: Event): void {
    if (this.eventService.isEventSaved(event)) {
      this.eventService.removeEvent(event);
    } else {
      this.eventService.addEvent(event);
    }
  }

  saveEvent(event: Event) {
    this.eventService.addEvent(event);
    console.log('Event gespeichert:', event);
  }

  openPopup(event: Event): void {
    this.selectedEvent = event;
    this.showPopup = true;
  }

  closePopup(): void {
    this.selectedEvent = null;
    this.showPopup = false;
  }

  openTicketLink() {
    if (this.selectedEvent && this.selectedEvent.ticketlink) {
      window.open(this.selectedEvent.ticketlink, '_blank');
    }
  }
}
