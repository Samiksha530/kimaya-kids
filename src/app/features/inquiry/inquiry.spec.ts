import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of, BehaviorSubject } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { Inquiry } from './inquiry';
import { Store } from '../../core/services/store';
describe('Inquiry', () => {
  let routeData: BehaviorSubject<{ page: string }>;
  let f: ComponentFixture<Inquiry>, c: Inquiry, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    routeData = new BehaviorSubject({ page: 'custom' });
    await TestBed.configureTestingModule({
      imports: [Inquiry],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '4' })),
            data: routeData,
            snapshot: { paramMap: convertToParamMap({ id: '4' }) },
          },
        },
      ],
    }).compileComponents();
    s = TestBed.inject(Store);
    f = TestBed.createComponent(Inquiry);
    c = f.componentInstance;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('requires a valid mobile number and design details', () => {
    c.form.patchValue({
      name: 'Demo',
      email: 'demo@example.com',
      phone: '123',
      details: 'short',
    });
    c.submit('custom');
    expect(c.form.invalid).toBe(true);
    expect(s.inquiries()).toHaveLength(0);
  });
  it('saves a valid design request', () => {
    c.form.patchValue({
      name: 'Demo',
      email: 'demo@example.com',
      phone: '9876543210',
      details: 'Green dress for a festival',
    });
    c.submit('custom');
    expect(s.inquiries()[0].kind).toBe('custom');
    expect(c.success()).toBeTruthy();
  });
  it('rejects out-of-range custom measurements', () => {
    c.form.patchValue({
      name: 'Demo',
      email: 'demo@example.com',
      phone: '9876543210',
      details: 'Dress for a family festival',
      chest: '-2',
    });
    c.submit('custom');
    expect(s.inquiries()).toHaveLength(0);
    expect(c.form.controls.chest.invalid).toBe(true);
  });
  it('requires appointment date and time and rejects a past date', () => {
    routeData.next({ page: 'appointment' });
    c.form.patchValue({
      name: 'Demo',
      email: 'demo@example.com',
      phone: '9876543210',
      details: 'Consultation for a dress',
    });
    c.submit('appointment');
    expect(c.form.controls.date.invalid).toBe(true);
    c.form.patchValue({ date: '2000-01-01', time: '10:00 AM' });
    c.submit('appointment');
    expect(s.inquiries()).toHaveLength(0);
    expect(s.toast()).toContain('future');
  });
  it('saves a future consultation and resets validation on route change', () => {
    routeData.next({ page: 'appointment' });
    c.form.patchValue({
      name: 'Demo',
      email: 'demo@example.com',
      phone: '9876543210',
      details: 'Consultation for a dress',
      date: '2099-01-01',
      time: '10:00 AM',
    });
    c.submit('appointment');
    expect(s.inquiries()[0].kind).toBe('appointment');
    routeData.next({ page: 'contact' });
    expect(c.form.controls.date.valid).toBe(true);
  });
});
