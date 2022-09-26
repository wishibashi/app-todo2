import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Investiments } from '../../model/investiments';
import { MOCK_LIST } from '../../services/list-investiments.mock';
import { ListInvestimentsService } from '../../services/list-investiments.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ListInvestimentsService;

  const mockList: Array<Investiments> = MOCK_LIST;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ HttpClientTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    service = TestBed.inject(ListInvestimentsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should list investments', () => {
    spyOn(service, 'list').and.returnValue(of(MOCK_LIST)); // Create Spy before call onInit
    component.ngOnInit();
    fixture.detectChanges();
    
    expect(service.list).toHaveBeenCalled()

    let investiments = component.investiments;
    expect(investiments.length).toBe(4);
    expect(investiments[0].name).toBe('Itaú');
    expect(investiments[investiments.length - 1].name).toBe('Nubank');
  });

  it('(I) should list investments', () => {
    spyOn(service, 'list').and.returnValue(of(MOCK_LIST)); // Create Spy before call onInit
    component.ngOnInit();
    fixture.detectChanges();

    let investiments = fixture.debugElement.nativeElement.querySelectorAll('.list-items');
    expect(investiments.length).toBe(4);
    expect(investiments[0].textContent.trim()).toEqual('Itaú | 100');
    expect(investiments[investiments.length - 1].textContent.trim()).toEqual('Nubank | 100');
  });


});
