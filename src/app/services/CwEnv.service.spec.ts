import {CwEnvService} from './CwEnv.service';

describe('CwEnvService', () => {
  let cwEnvService: CwEnvService;

  describe('when development', () => {
    beforeEach(() => {
      cwEnvService = new CwEnvService('DEVELOPMENT', 'http://localhost:8081/api');
    });

    describe('Property: isDevelopment', () => {
      it('should return true', () => {
        expect(cwEnvService.isDevelopment).toBe(true);
      });
    });

    describe('Property: isProduction', () => {
      it('should return false', () => {
        expect(cwEnvService.isProduction).toBe(false);
      });
    });

    describe('Property: apiBasePath', () => {
      it('should be the path passed as a constructor argument', () => {
        expect(cwEnvService.apiBasePath).toBe('http://localhost:8081/api');
      });
    });
  });

  describe('when production', () => {
    beforeEach(() => {
      cwEnvService = new CwEnvService('PRODUCTION', 'http://api.server.com');
    });

    describe('Property: isDevelopment', () => {
      it('should return false', () => {
        expect(cwEnvService.isDevelopment).toBe(false);
      });
    });

    describe('Property: isProduction', () => {
      it('should return true', () => {
        expect(cwEnvService.isProduction).toBe(true);
      });
    });

    describe('Property: apiBasePath', () => {
      it('should be the path passed as a constructor argument', () => {
        expect(cwEnvService.apiBasePath).toBe('http://api.server.com');
      });
    });
  });
});
