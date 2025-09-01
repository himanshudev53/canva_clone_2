import { UserDetailContext } from '@/contexts/UserDetailsContext';
import { api } from '@/convex/_generated/api';
import { IUser } from '@/types';
import { useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react';
import React, { ReactNode, useEffect } from 'react'

function Provider({ children }: { children: ReactNode }) {
    const user = useUser();
    const [userDetail, setUserDetail] = React.useState<IUser | null>(null);
    const createNewUserMutation = useMutation(api.users.CreateNewUser);

    const CreateUser = async () => {
        const data = {
            name: String(user?.displayName),
            email: String(user?.primaryEmail),
            picture: String(user?.profileImageUrl)
        }
        const result = await createNewUserMutation({ ...data })
        if (result) {
            setUserDetail({ ...result })
        }
    }
    console.log({ user })

    useEffect(() => {
        user && CreateUser()
    }, [user])
    return (
        <div>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                {children}
            </UserDetailContext.Provider>
        </div>
    )
}

export default Provider