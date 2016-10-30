export class EnvService {
  get isDevelopment(): boolean {
    return this._env === 'DEVELOPMENT';
  };

  get isProduction(): boolean {
    return this._env === 'PRODUCTION';
  };

  get apiBasePath(): string {
    return this._apiBasePath;
  };

  private _env: string;
  private _apiBasePath: string;

  constructor(env: string, apiBasePath: string) {
    this._env = env;
    this._apiBasePath = apiBasePath;
  }
}
