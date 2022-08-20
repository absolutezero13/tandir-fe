import {AuthApi} from './auth';
import {CounterApi} from './counter';

export class ApiService implements IService {
  private inited = false;

  counter: CounterApi;
  authApi: AuthApi;

  constructor() {
    this.counter = new CounterApi();
    this.authApi = new AuthApi();
  }

  init = async (): PVoid => {
    if (!this.inited) {
      // your code ...

      this.inited = true;
    }
  };
}
