import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should set and get user', () => {
    // Arrange
    const user = 'Mr Tickle';

    // Act
    service.setUser(user);

    // Assert
    service.getUser().subscribe( result => {
      expect(result).toEqual(user);
    });
  });
});
