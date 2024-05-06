import { Context, createContext, useState } from "react";
import { User } from "../../types/definitions";

export type Session = {
    user: User | undefined;
    isLoggedIn: boolean;
    check: [boolean, boolean];
}

export type SessionContextType = {
    session: Session;
    login: (user: User) => void;
    logout: () => void;
    check: (check: [boolean, boolean]) => void;
}

export const SessionContext: Context<SessionContextType | undefined> = createContext<SessionContextType | undefined>(undefined);

function SessionContextProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const [session, setSession]: [Session, React.Dispatch<React.SetStateAction<Session>>] = useState<Session>({
        user: undefined,
        isLoggedIn: false,
        check: [false, false]
    });

    async function login(user: User) {
        setSession((prev) => ({ ...prev, user, isLoggedIn: true, }));
    }

    async function logout() {
        setSession((prev) => ({ ...prev, user: undefined, isLoggedIn: false }));
    }

    async function check(check: [boolean, boolean]) {
        setSession((prev) => ({ ...prev, check: check  }))
    }

    return <SessionContext.Provider value={{ session, login, logout, check }}>{children}</SessionContext.Provider>
}

export default SessionContextProvider;