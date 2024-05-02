import { TestBed } from '@angular/core/testing';

import { GivePermissionService } from './give-permission.service';

describe('GivePermissionService', () => {
  let service: GivePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GivePermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
