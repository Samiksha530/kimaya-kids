import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { About } from './about';
describe('About', () => {
  let f: ComponentFixture<About>, el: HTMLElement;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [About],
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
    f = TestBed.createComponent(About);
    el = f.nativeElement;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('shows the brand story and six working gallery image links', () => {
    expect(el.textContent).toContain('Kimaya Kids');
    expect(el.querySelectorAll('.gallery a')).toHaveLength(6);
    expect(el.querySelector('.gallery a')?.getAttribute('href')).toBe('/images/dress-5.webp');
  });
});
