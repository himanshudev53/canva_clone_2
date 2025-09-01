import { IUser } from "@/types";
import { createContext } from "react";

interface UserDetailContextType {
    userDetail: IUser | null;
    setUserDetail: (userDetail: IUser | null) => void;
}

export const UserDetailContext = createContext<UserDetailContextType>({
    userDetail: null,
    setUserDetail: () => { },
});
