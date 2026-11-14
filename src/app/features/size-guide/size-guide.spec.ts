import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import { SizeGuide } from './size-guide';
describe('SizeGuide', () => {
  let f: ComponentFixture<SizeGuide>, el: HTMLElement;
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [SizeGuide],
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
    f = TestBed.createComponent(SizeGuide);
    el = f.nativeElement;
    f.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });
  it('renders all five ages with units and fit guidance', () => {
    expect(el.querySelectorAll('tbody tr')).toHaveLength(5);
    expect(el.textContent).toContain('inches');
    expect(el.textContent).toContain('Confirm the final fit');
  });
});
