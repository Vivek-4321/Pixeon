import create from 'zustand';

const useStore = create((set) => ({
  user: {},
  notifications: {},
  setUser: (user) => set({ user }),
  setNotifications: (notifications) => set({ notifications }),
}));

export default useStore;
