import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

export class Loading implements IStore {
  loading = false;
  setLoading = (v: boolean): void => {
    this.loading = v;
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: Loading.name,
      properties: ['loading'],
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
