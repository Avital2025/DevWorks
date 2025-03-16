import { TestBed } from '@angular/core/testing';

import { ExtractedFilesService } from './extracted-files-service.service';
describe('ExtractedFilesServiceService', () => {
  let service: ExtractedFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractedFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
