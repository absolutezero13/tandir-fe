import React from 'react';
import {UIStore} from './ui';

export const stores = {
  ui: new UIStore(),
};
type ContextStores = typeof stores;

const storeContext = React.createContext<ContextStores>(stores);
export const StoresProvider = ({children}: any) => (
  <storeContext.Provider value={stores}>{children}</storeContext.Provider>
);

export const useStores = (): ContextStores => React.useContext(storeContext);
