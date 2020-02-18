import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Title, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HeaderComponent } from './header.component';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const expectedTitle = 'Title';
  const expectedUser = 'User';

  class MockTitleService {
    getTitle() { return expectedTitle; }
  }

  class MockUserService {
    getUser() { return of(expectedUser); }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: Title, useClass: MockTitleService },
        { provide: UserService, useClass: MockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display title in header', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const titleElement = element.query(By.css('.header'));
    const title: HTMLElement = titleElement.nativeElement;

    // Act

    // Assert
    expect(title.innerHTML).toEqual(expectedTitle);

  });

  it('should display user in header', () => {
    // Arrange
    const element: DebugElement = fixture.debugElement;
    const userElement = element.query(By.css('.banner__user'));
    const user: HTMLElement = userElement.nativeElement;

    // Act
    component.ngOnInit();

    // Assert
    expect(user.innerHTML).toContain(expectedUser);
  });
});
