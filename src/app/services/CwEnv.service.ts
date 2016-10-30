export class CwEnvService {
  public get isDevelopment(): boolean {
    return this.env === 'DEVELOPMENT';
  };

  public get isProduction(): boolean {
    return this.env === 'PRODUCTION';
  };

  constructor(private env: string, readonly apiBasePath: string) {}
}
