import { Injectable } from '@angular/core';
import { Flight } from '../model/flight.model';

@Injectable({
  providedIn: 'root'
})

export class FlightService {
  private flights: Flight[] = [];

  constructor() {
    this.generateDynamicDates(); // עדכון תאריכים דינאמיים
  }

  // טיסות סטטיות עם מקורות מגוונים
  private staticFlights: Omit<Flight, 'boardingDate' | 'arrivalDate'>[] = [
  new Flight('W61283', 'Tel Aviv', 'Krakow', new Date(), new Date(), 200, 'https://www.elal.com/magazine/wp-content/uploads/2023/09/krakow-rynek-glowwny-806x463-shutterstock_1341413513.jpg'),
  new Flight('LX8396', 'Zurich', 'Frankfurt', new Date(), new Date(),  150, 'https://www.elal.com/magazine/wp-content/uploads/2017/01/shutterstock_145475239.jpg'),
  new Flight('BA2189',  'London',  'Tel Aviv', new Date(), new Date(),  180,  'https://www.zmantelaviv.com/wp-content/uploads/2023/09/2.jpg'),
  new Flight('LH7890',  'Berlin',  'Vienna', new Date(), new Date(),  170,  'https://www.elal.com/magazine/wp-content/uploads/2017/05/shutterstock_238923085-1.jpg'),
  new Flight('AF3056',  'Paris',  'Rome', new Date(), new Date(),  190,  'https://www.elal.com/magazine/wp-content/uploads/2017/01/shutterstock_147643964.jpg'),
  new Flight('IB2045',  'Madrid',  'Barcelona', new Date(), new Date(),  160,  'https://www.elal.com/magazine/wp-content/uploads/2017/01/shutterstock_229604983.jpg'),
  new Flight('KL4510',  'Amsterdam', 'Athens', new Date(), new Date(), 200, 'https://www.elal.com/magazine/wp-content/uploads/2018/07/shutterstock_776615074.jpg'),
  new Flight('AZ1198',  'Rome',  'Zurich', new Date(), new Date(),  210,  'https://www.easygo.co.il/clients/easygo/gallery/Zurich/zuirch-1-756.jpg'),
  new Flight('OA3001',  'Athens',  'London', new Date(), new Date(),  140,  'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRj8g2WGx2WKl5DjBWBUSrjKrxZ9s4_PGHPlZJi7Cth748HVkEG6BvXcPFQ7uyLUJfGmlKic1YO_LCZ7jepcZH2C5bUFSt2cpHY0uEIjA'),
  new Flight('OS9003',  'Vienna',  'Tokyo', new Date(), new Date(),  180,  'https://blog.easygo.co.il/wp-content/uploads/2019/09/tokyo2.jpg'),
];

  // מתודה ליצירת תאריכים דינאמיים
  private generateDynamicDates(): void {
    const now = new Date();
    this.flights = this.staticFlights.map((flight, index) => {
      const boardingDate = new Date(now);
      boardingDate.setDate(now.getDate() + index * 2); // תאריך המראה דינאמי

      const arrivalDate = new Date(boardingDate);
      arrivalDate.setHours(boardingDate.getHours() + 3); // משך טיסה: 3 שעות

      return { ...flight, boardingDate, arrivalDate };
    });
  }

  // מתודת החזרת רשימת כל הטיסות
  list(): Flight[] {
    return this.flights; // עותק של המערך
  }

  // מתודת מציאת טיסה לפי מספר טיסה
  get(flightNumber: string): Flight | undefined {
    return this.flights.find(flight => flight.flightNumber === flightNumber);
  }
}
