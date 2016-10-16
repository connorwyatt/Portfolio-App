import {EnvService} from './Env.service';

describe('EnvService', () => {
  let envService: EnvService;

  describe('when development', function() {
    beforeEach(() => {
      envService = new EnvService('DEVELOPMENT', 'http://localhost:8081/api');
    });

    describe('Property: isDevelopment', () => {
      it('should return true', () => {
        expect(envService.isDevelopment).toBe(true);
      });
    });

    describe('Property: isProduction', () => {
      it('should return false', () => {
        expect(envService.isProduction).toBe(false);
      });
    });

    describe('Property: apiBasePath', () => {
      it('should be the path passed as a constructor argument', () => {
        expect(envService.apiBasePath).toBe('http://localhost:8081/api');
      });
    });
  });

  describe('when production', function() {
    beforeEach(() => {
      envService = new EnvService('PRODUCTION', 'http://api.server.com');
    });

    describe('Property: isDevelopment', () => {
      it('should return false', () => {
        expect(envService.isDevelopment).toBe(false);
      });
    });

    describe('Property: isProduction', () => {
      it('should return true', () => {
        expect(envService.isProduction).toBe(true);
      });
    });

    describe('Property: apiBasePath', () => {
      it('should be the path passed as a constructor argument', () => {
        expect(envService.apiBasePath).toBe('http://api.server.com');
      });
    });
  });
});
