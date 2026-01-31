import { useEffect } from "react";
import { store } from "../store";
import { initAuthListener } from "../store/slices/authSlice";

export default function AuthListener() {
    useEffect(() => {
        return initAuthListener(store.dispatch);
    }, []);
    return null;
}
