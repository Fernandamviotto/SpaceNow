import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MockService {
  private storageKey = 'spacenow_mock_data';
  constructor(private http: HttpClient) {}

  async init() {
    const has = localStorage.getItem(this.storageKey);
    if (!has) {
      const data: any = await this.http.get('/assets/mock-data.json').toPromise();
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      return data;
    }
    return JSON.parse(localStorage.getItem(this.storageKey)!);
  }

  getData() { const raw = localStorage.getItem(this.storageKey); return raw ? JSON.parse(raw) : null; }
  saveData(data: any) { localStorage.setItem(this.storageKey, JSON.stringify(data)); }

  getRooms() { const d = this.getData(); return d?.rooms || []; }
  getReservations() { const d = this.getData(); return d?.reservations || []; }

  // check conflict: returns true if conflict exists
  hasConflict(roomId: string, startISO: string, endISO: string, ignoreId: string | null = null): boolean {
    const reservations = this.getReservations();
    const s = new Date(startISO).getTime();
    const e = new Date(endISO).getTime();
    for (const r of reservations) {
      if (ignoreId && r.id === ignoreId) continue;
      if (r.roomId !== roomId) continue;
      const rs = new Date(r.start).getTime();
      const re = new Date(r.end).getTime();
      // overlap if start < re && end > rs
      if (s < re && e > rs) return true;
    }
    return false;
  }

  addReservation(ev: any) {
    const d = this.getData() || { rooms: [], reservations: [] };
    if (this.hasConflict(ev.roomId, ev.start, ev.end)) {
      return { ok: false, reason: 'conflict' };
    }
    d.reservations.push(ev);
    this.saveData(d);
    return { ok: true };
  }

  updateReservation(updated: any) {
    const d = this.getData();
    if (!d) return { ok: false };
    if (this.hasConflict(updated.roomId, updated.start, updated.end, updated.id)) {
      return { ok: false, reason: 'conflict' };
    }
    d.reservations = d.reservations.map((r:any) => r.id === updated.id ? updated : r);
    this.saveData(d);
    return { ok: true };
  }
}
