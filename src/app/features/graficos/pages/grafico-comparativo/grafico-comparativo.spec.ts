import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoComparativo } from './grafico-comparativo';

describe('GraficoComparativo', () => {
  let component: GraficoComparativo;
  let fixture: ComponentFixture<GraficoComparativo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoComparativo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoComparativo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
