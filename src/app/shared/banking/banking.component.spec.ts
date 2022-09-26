import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from '../investiments/components/list/list.component';

import { BankingComponent } from './banking.component';

describe('BankingComponent', () => {
  let component: BankingComponent;
  let fixture: ComponentFixture<BankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingComponent, ListComponent ],
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) getPoupanca(): should poupanca have 10`, () => {
    expect(component.getPoupanca).toEqual(10);
  })

  it(`(U) getCarteira(): should carteira have 50`, () => {
    expect(component.getCarteira).toEqual(50);
  })

  it(`(U) setSacar(): should transfer from poupanca to carteira`, () => {
    component.setSacar('10');
    fixture.detectChanges();
    expect(component.getPoupanca).toEqual(0);
    expect(component.getCarteira).toEqual(60);
  })

  it(`(U) setSacar(): should not transfer if value have string or value is greater than popupanca`, () => {
    expect(component.setSacar('string')).not.toBeTruthy;
    expect(component.setSacar('100')).not.toBeTruthy;
    fixture.detectChanges();
    expect(component.getPoupanca).toEqual(10);
    expect(component.getCarteira).toEqual(50);
  })

  it(`(I) setSacar(): should transfer from poupanca to carteira`, () => {
    let el = fixture.debugElement.nativeElement;
    el.querySelector('#input-sacar').value = '10';
    el.querySelector('#btn-sacar').click();
    fixture.detectChanges();
    expect(el.querySelector('#get-poupanca').textContent).toEqual('0');
    expect(el.querySelector('#get-carteira').textContent).toEqual('60');
  })

  it(`(U) setDepositar(): should transfer from carteira to poupanca`, () => {
    component.setDepositar('10');
    fixture.detectChanges();
    expect(component.getPoupanca).toEqual(20);
    expect(component.getCarteira).toEqual(40);
  })

  it(`(U) setDepositar(): should not transfer if value have string or value is greater than carteira`, () => {
    expect(component.setDepositar('string')).not.toBeTruthy;
    expect(component.setDepositar('100')).not.toBeTruthy;
    fixture.detectChanges();
    expect(component.getPoupanca).toEqual(10);
    expect(component.getCarteira).toEqual(50);
  })

  it(`(I) setDepositar(): should transfer from carteira to poupanca`, () => {
    let el = fixture.debugElement.nativeElement;
    el.querySelector('#input-depositar').value = '10';
    el.querySelector('#btn-depositar').click();
    fixture.detectChanges();
    expect(el.querySelector('#get-poupanca').textContent).toEqual('20');
    expect(el.querySelector('#get-carteira').textContent).toEqual('40');
  })

});
