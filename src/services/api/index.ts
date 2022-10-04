import {AuthApi} from './auth';
import {TurkeyApi} from './turkey';
import {CounterApi} from './counter';

export class ApiService implements IService {
  private inited = false;

  counter: CounterApi;
  authApi: AuthApi;
  turkeyApi: TurkeyApi;
  constructor() {
    this.counter = new CounterApi();
    this.authApi = new AuthApi();
    this.turkeyApi = new TurkeyApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      // your code ...

      this.inited = true;
    }
  };
}
