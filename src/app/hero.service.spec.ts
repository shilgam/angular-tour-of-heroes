import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import HeroService from './hero.service';
import MessageService from './message.service';
import Hero from './hero';

describe('HeroService', () => {
  let heroService: HeroService;
  let messageService: MessageService;
  let httpMock: HttpTestingController;
  const invalidRequestBody = 'Invalid request parameters';
  const invalidRequestOptions = { status: 404, statusText: 'Bad Request' };
  const errorMessage = 'failed: Http failure response for api/heroes: 404 Bad Request';

  const mockHeroes: Hero[] = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService]
    });
    heroService = TestBed.inject(HeroService);
    messageService = TestBed.inject(MessageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // assert that there are no outstanding requests.
    httpMock.verify();
  });

  function setup() {
    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    return { handleErrorSpy, logSpy, addSpy };
  }

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should get heroes', () => {
    const { handleErrorSpy, logSpy, addSpy } = setup();

    // Make an HTTP GET request
    heroService.getHeroes().subscribe((heroes: Hero[]) => {
      // When observable resolves, result should match test data
      expect(heroes.length).toEqual(3);
      expect(heroes[0].id).toEqual(11);
      expect(heroes[0].name).toEqual('Dr Nice');
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const request = httpMock.expectOne('api/heroes', 'call to getHeroes');

    // Assert that the request is a GET.
    expect(request.request.method).toBe('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    request.flush(mockHeroes);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('getHeroes', []);
    expect(logSpy).toHaveBeenCalledWith('fetched heroes');
    expect(addSpy).toHaveBeenCalledWith('HeroService: fetched heroes');
  });

  it('should handle error: getHeroes', () => {
    const expectedLog = `getHeroes ${errorMessage}`;
    const expectedMessage = `HeroService: getHeroes ${errorMessage}`;
    const { handleErrorSpy, logSpy, addSpy } = setup();

    heroService.getHeroes().subscribe((heroes: Hero[]) => {
      expect(heroes.length).toEqual(0);
    });

    const request = httpMock.expectOne('api/heroes', 'call to getHeroes');

    expect(request.request.method).toBe('GET');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('getHeroes', []);
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should get hero', () => {
    const expectedLog = 'fetched hero id=11';
    const expectedMessage = 'HeroService: fetched hero id=11';
    const { handleErrorSpy, logSpy, addSpy } = setup();

    heroService.getHero(11).subscribe((hero) => {
      expect(hero.id).toEqual(11);
      expect(hero.name).toEqual('Dr Nice');
    });

    const request = httpMock.expectOne('api/heroes/11', 'call to getHero');

    expect(request.request.method).toBe('GET');
    request.flush(mockHeroes[0]);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('getHero id=11');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should handle error: getHero', () => {
    const errorMsg = 'failed: Http failure response for api/heroes/13: 404 Bad Request';
    const expectedLog = `getHero id=13 ${errorMsg}`;
    const expectedMessage = `HeroService: getHero id=13 ${errorMsg}`;
    const { handleErrorSpy, logSpy, addSpy } = setup();

    heroService.getHero(13).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const request = httpMock.expectOne('api/heroes/13', 'call to getHero');

    expect(request.request.method).toBe('GET');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('getHero id=13');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should update hero', () => {
    const expectedLog = 'updated hero id=12';
    const expectedMessage = 'HeroService: updated hero id=12';
    const { handleErrorSpy, logSpy, addSpy } = setup();

    heroService.updateHero(mockHeroes[1]).subscribe((response) => {
      expect(response).toEqual(mockHeroes[1]);
    });

    const request = httpMock.expectOne('api/heroes', 'call to updateHero');

    expect(request.request.method).toEqual('PUT');
    request.flush(mockHeroes[1]);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('updateHero');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should handle error: updateHero', () => {
    const expectedLog = `updateHero ${errorMessage}`;
    const expectedMessage = `HeroService: updateHero ${errorMessage}`;
    const { handleErrorSpy, logSpy, addSpy } = setup();

    heroService.updateHero(mockHeroes[1]).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const request = httpMock.expectOne('api/heroes', 'call to updateHero');

    expect(request.request.method).toEqual('PUT');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('updateHero');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });
});
