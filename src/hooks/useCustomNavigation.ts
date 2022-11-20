import {useServices} from '../services';

export const useCustomNavigation = () => {
  const {nav} = useServices();

  return {
    navigate: nav.navigate,
    replace: nav.replace,
  };
};
