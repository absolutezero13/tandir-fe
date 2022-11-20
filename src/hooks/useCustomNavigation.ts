import {useServices} from '../services';

const useCustomNavigation = () => {
  const {nav} = useServices();

  return {
    navigate: nav.navigate,
    replace: nav.replace,
  };
};

export default useCustomNavigation;
