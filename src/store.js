import create from 'zustand';

const useStore = create((set) => ({
  user: {},
  notifications: {},
  token: "",
  setUser: (user) => set({ user }),
  setNotifications: (notifications) => set({ notifications }),
  setToken: (token) => set({ token }),
}));

export default useStore;
