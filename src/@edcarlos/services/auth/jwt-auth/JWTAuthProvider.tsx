import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import jwtAxios, { setAuthToken } from "./index";
import { AuthUser } from "../../../../types/models/AuthUser";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../../../../redux/actions";
import { randomNum, decryptorUtil, getUserFromToken, deleteAllCookies, deleteAllCookiesAlt } from '@edcarlos/utility/Utils';
import { toast } from 'react-toastify';
import { appIntl } from "@edcarlos/utility/helper/Utils";
import Router, { useRouter } from "next/router";
import { useHistory } from "react-router-dom";
import { Cookie } from "@mui/icons-material";


interface JWTAuthContextProps {
  user: AuthUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  name: string;
  user_email: string;
  password: string;
}

interface SignInProps {
  //user_email: string;
  username: string;
  password: string;

}

interface JWTAuthActionsProps {
  signUpUser: (data: SignUpProps) => void;
  signInUser: (data: SignInProps) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: () => { },
  signInUser: () => { },
  logout: () => { },
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({
  children,
}) => {
  const [authData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  const router = useRouter();
  //const onGoToLoginPage = () => { router.push("/signin"); }
  /*
  const router = useRouter();
  const onGoToLoginPage = () => { router.push("/signin"); };
  const refreshPage = ()=>{window.location.reload();}
  const history = useHistory();
  const historyRefresh=()=>{ history.push("/"); }
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };
*/

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      let tokenPayload = getUserFromToken(token)
      let userId = tokenPayload.id
      let id = userId;
      jwtAxios

        .get(`/system_user?id=${id}`)
        .then(({ data }) =>
          setJWTAuthData({
            //user: data,
            user: data.document,
            isLoading: false,
            isAuthenticated: true,
          })
        )
        .catch(() =>
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          })
        );
    };

    getAuthUser();
  }, []);

  //user_email,// user_email: string;
  const signInUser = async ({ username, password, }: { username: string; password: string; }) => {

    const { messages } = appIntl();
    dispatch(fetchStart());
    try {
      const { data } = await jwtAxios.post("auth", { username, password });
      setAuthToken(data.document.token);
      let tokenPayload = getUserFromToken(data.document.token)
      let userId = tokenPayload.id
      if (userId && userId !== '') {
        console.log(`Found Token User ID`, userId)
        //const res = await jwtAxios.get(`/system_users/${userId}`);
        const id = userId;
        const res = await jwtAxios.get(`system_user?id=${id}`);
        //console.log(`Auth Data Found`, res.data.document)
        setJWTAuthData({
          user: res.data.document,
          isAuthenticated: true,
          isLoading: false,
        });

        await jwtAxios.put(`/users/userlogs/system_user_log?id=${id}`)
        console.log(`SuccessFull User Login Update`)
        dispatch(fetchSuccess());
      }
    } catch (error) {

      setJWTAuthData({
        ...authData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch(fetchError(String(messages["message.somethingWentWrong"])));
    }
  };

  const signUpUser = async ({ name, user_email, password, }: { name: string; user_email: string; password: string; }) => {
    const { messages } = appIntl();
    dispatch(fetchStart());
    try {
      const { data } = await jwtAxios.post("users", { name, user_email, password });
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch(fetchSuccess());
    } catch (error) {
      setJWTAuthData({
        ...authData,
        isAuthenticated: false,
        isLoading: false,
      });
      //dispatch(fetchError("Something went wrong"));
      //toast.error(String(messages["register.error"]),{ theme: "colored" });
      dispatch(fetchError(String(messages["message.somethingWentWrong"])));

    }
  };

  const logout = async () => {
    let tokenPayload = getUserFromToken(localStorage.getItem("token"))
    await jwtAxios.put(`/users/userlogs/system_user_logout?id=${tokenPayload.id}`)
    localStorage.removeItem("token");

    setAuthToken('');
    setJWTAuthData({
      user: {} || null || undefined,
      isLoading: false,
      isAuthenticated: false,
    });


    // Cookie.remove('Token');
    deleteAllCookiesAlt();
    deleteAllCookies();
    //Router.reload();
    //window.location.reload()
    //window.location.href = '/';
    //router.push('/')
    router.reload();

    return false;
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...authData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;