import { Context, createContext, useState } from "react";
import { User } from "../../types/definitions";

export type Session = {
    user: User | undefined;
    isLoggedIn: boolean;
}

export type SessionContextType = {
    session: Session;
    login: (user: User) => void;
    logout: () => void;
}

export const SessionContext: Context<SessionContextType | undefined> = createContext<SessionContextType | undefined>(undefined);

function SessionContextProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const [session, setSession]: [Session, React.Dispatch<React.SetStateAction<Session>>] = useState<Session>({
        user: undefined,
        isLoggedIn: false
    });

    async function login(user: User) {
        setSession({ user, isLoggedIn: true  });
    }

    async function logout() {
        setSession({ user: undefined, isLoggedIn: false });
    }

    return <SessionContext.Provider value={{ session, login, logout }}>{children}</SessionContext.Provider>
}

export default SessionContextProvider;