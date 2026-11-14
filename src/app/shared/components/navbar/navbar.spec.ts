import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { Navbar } from './navbar';
import { Store } from '../../../core/services/store';
describe('Navbar', () => {
  let f: ComponentFixture<Navbar>, el: HTMLElement, s: Store;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '4' })),
            data: of({ page: 'custom' }),
            snapshot: { paramMap: convertToParamMap({ id: '4' }) },
          },
        },
      ],
    }).compileComponents();
    s = TestBed.inject(Store);
    f = TestBed.createComponent(Navbar);
    el = f.nativeElement;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('updates shopping counters when the bag changes', () => {
    s.add(1, '1–2 years');
    f.detectChanges();
    expect(el.querySelector('.bag sup')?.textContent?.trim()).toBe('1');
  });
  it('exposes accessible navigation and wishlist controls', () => {
    expect(el.querySelector('nav')?.getAttribute('aria-label')).toBe('Main navigation');
    expect(el.querySelector('[aria-label="Wishlist"]')).toBeTruthy();
  });
});
