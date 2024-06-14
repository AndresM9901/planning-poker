import { TestBed } from '@angular/core/testing';
import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';

jest.mock('uuid');

describe('RoomService', () => {
  let service: SharedService;
  let mockUuidV4 = {
    uuidv4: () => '123e4567-e89b-12d3-a456-426614174000'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
    (uuid.v4 as jest.Mock).mockReturnValue('123e4567-e89b-12d3-a456-426614174000');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // setFormSubmitted()

  it('setFormSubmitted: should set isFormSubmitted$ to true when setFormSubmitted is called', () => {
    service['isFormSubmitted$'] = new BehaviorSubject<boolean>(false);
    const spy = jest.spyOn(service['isFormSubmitted$'], 'next').mockImplementation();

    service.setFormSubmitted = true;

    expect(service['isFormSubmitted$']).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);
  });

  // generateUniqueId()

  it('generateUniqueId: should call uuidv4 and return its result', () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';

    const result = service.generateUniqueId();

    expect(result).toBe(id);
    expect(uuid.v4).toHaveBeenCalledTimes(1);
    expect(uuid.v4).toHaveReturnedWith(id);
  });
});
