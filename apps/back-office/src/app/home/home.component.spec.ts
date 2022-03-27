import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
  xdescribe('ngOnInit', () => {
    it('should call ngOnInit with correct value', () => {
      const spy = jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  })
  describe('getHomeAddress', () => {
    it('should call getHomeAddress with correct value', () => {
      const spy = jest.spyOn(component, 'getHomeAddress');
      component.getHomeAddress();
      expect(spy).toHaveBeenCalled();
    });
  })

});
