import { TestBed, inject } from '@angular/core/testing';

import { PageDataResolverService } from './page-data-resolver.service';

describe('PageDataResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageDataResolverService]
    });
  });

  it('should be created', inject([PageDataResolverService], (service: PageDataResolverService) => {
    expect(service).toBeTruthy();
  }));
});
