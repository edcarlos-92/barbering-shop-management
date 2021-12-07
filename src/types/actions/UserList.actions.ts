//import { UserList } from "../../@edcarlos/services/db/userList";


interface UserList {

}


export const GET_USER_LIST = "GET_USER_LIST";

export interface GetUserListActions {
  type: typeof GET_USER_LIST;
  payload: UserList[];
}

export type UserListActions = GetUserListActions;
