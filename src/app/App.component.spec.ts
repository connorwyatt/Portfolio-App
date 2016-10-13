import {AppComponent} from './App.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(() => {
    app = new AppComponent();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
