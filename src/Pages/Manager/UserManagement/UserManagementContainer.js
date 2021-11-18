import React,{useState,useEffect} from "react";
import { useHistory } from "react-router";
import { FetchUsersApi } from "../../../Utils/api";
import UserManagement from "./UserManagement";


function UserManagementContainer() {
    const history = useHistory();
    const [userData, setUserData] = useState([]);
    
    const getUserList = () => {
        FetchUsersApi().then((res)=>{
            setUserData(res.data);
        })
    }

    useEffect(()=>{
        getUserList();
    },[]);

    return(
        <>
            <UserManagement
                userData={userData}
            />
        </>
    );
}

export default UserManagementContainer;