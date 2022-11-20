import {useServices} from '../services';

const useCustomNavigation = () => {
  const {nav} = useServices();

  return {
    navigate: nav.navigate,
    replace: nav.replace,
    goBack: nav.goBack,
  };
};

export default useCustomNavigation;
