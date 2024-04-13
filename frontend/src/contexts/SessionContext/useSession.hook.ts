import { useContext } from "react";
import { SessionContext, SessionContextType } from "./SessionContext.context";

function useSession(): SessionContextType {
    const context: SessionContextType | undefined = useContext(SessionContext);

    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }

    return context;
}

export default useSession;