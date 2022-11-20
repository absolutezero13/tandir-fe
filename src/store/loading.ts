import create from 'zustand';

const useLoading = create<ILoading>(set => ({
  loading: false,
  setLoading: (v: boolean) => set({loading: v}),
}));

interface ILoading {
  loading: boolean;
  setLoading: (v: boolean) => void;
}

export default useLoading;
