import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LoginInfo } from '../interfaces/types';
import { loginService } from '../services/AuthService';

interface LoginStore {
    loginData: {
        token: string | null
        message: string | null
    },
    error: boolean,
    authLogin: (data: LoginInfo) => void
}

const useUserStore = create<LoginStore>()(
    persist(
        (set, get) => ({
          loginData: {
            token: null,
            message: null,
          },
          error: false,
          authLogin: (data : LoginInfo) => {
            loginService(data)
            .then(response => response.json())
            .then(data => {
                if(data.token){
                    set({loginData: {token: data.token, message: null}, error: false})
                    return;
                }
                if(data.error){
                    set({loginData: {token: null, message: data.error}, error: true})
                    return;
                }
            })
            .catch(error => {
                console.error("Error", error);
            })
          },
        }),
        {
          name: 'token-storage',
          storage: createJSONStorage(() => localStorage), 
        }
      )
)

export default useUserStore;