import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { NotificationService } from './services/notification.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();

  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    // way 1
    expect(fixture.debugElement.nativeElement.querySelector('h1').textContent).toContain('This is a title');
    // way 2
    console.log(fixture.debugElement.query(By.css('h1')))
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerText).toContain('This is a title');
  });

  it('should call getMyIp when the get-ip button is clicked', () => {
    const apiService: ApiService = TestBed.get(ApiService)
    const getMyIpSpy = spyOn(apiService, 'getMyIp')
      .and.returnValue(of('1234'))

    const button = fixture.debugElement.query(By.css('#get-ip')).nativeElement;
    button.click()

    expect(getMyIpSpy).toHaveBeenCalled();
    expect(component.ip).toBe('1234');
  })

  it('should update time on updateTime', () => {
    jasmine.clock().mockDate(new Date(2020, 1, 1, 0, 0, 0, 0));
    component.time = new Date(2019, 12, 31, 0, 0, 0, 0);

    component.updateTime();

    expect(component.time).toEqual(new Date(2020, 1, 1, 0, 0, 0, 0));
  })

  it('should update the time at the full minute', () => {
    jasmine.clock().mockDate(new Date(2020, 1, 1, 0, 0, 23, 0));
    const spy = spyOn(component, 'updateTime').and.callThrough();
    component.time = null;

    component.updateTime();


    jasmine.clock().tick(37001);

    expect(spy).toHaveBeenCalled();
    expect(component.time).toEqual(new Date(2020, 1, 1, 0, 1, 0, 0));
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should get an ip from the API service on GetMyIp', () => {
    const apiService: ApiService = TestBed.get(ApiService);
    const emitter = new EventEmitter();
    spyOn(apiService, 'getMyIp').and.returnValue(emitter);
    component.ip = '';

    component.getMyIp();
    emitter.emit('192.168.1.1');

    expect(component.ip).toBe('192.168.1.1')
  })

  it('should call the notification service on error in GetMyIp', () => {
    const apiService: ApiService = TestBed.get(ApiService);
    const notificationService: NotificationService = TestBed.get(NotificationService);
    const emitter = new EventEmitter();
    spyOn(apiService, 'getMyIp').and.returnValue(emitter);
    const notificationSpy = spyOn(notificationService, 'showAlert')

    component.getMyIp();
    emitter.error('errrrr');

    expect(notificationSpy).toHaveBeenCalledWith('Fout:errrrr')
  });

  it('should say that 2 is even', () => {
    expect(component.isNumberEven(2)).toBeTrue();
  });

  it('should say that 1 is even', () => {
    expect(component.isNumberEven(1)).toBeFalse();
  });

  it('should set a very interesting fact about an even number', () => {
    component.numberInformation='';

    component.updateNumber(66);

    expect(component.numberInformation).toBe('Facinating, that is 2 times 33');
  });

  it('should set an impressive fact about an odd number', () => {
    component.numberInformation='';

    component.updateNumber(15);

    expect(component.numberInformation).toBe('Interesting, that is half of 30');
  });

});
