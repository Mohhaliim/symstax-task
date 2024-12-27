import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
import Loading from "@/components/loading";

const ProtectedRoute = ({ children }: {children: React.ReactNode}) => {
    const {loading, user} = useSelector((state: RootState) => state.auth);

    if(loading) return <Loading />
    if(!user) return <Navigate to="/login" />

    return children
}

export default ProtectedRoute