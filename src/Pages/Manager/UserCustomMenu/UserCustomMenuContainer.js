import React, { useState } from "react";
import UserCustomMenu from "./UserCustomMenu";

function UserCustomMenuContainer() {
  const USER_DATA = [
    {
      uid: 1,
      id: "jhy901",
      name: "전하영",
      company: "금오공과대학교",
      role: "학생",
    },
    {
      uid: 2,
      id: "jhy901",
      name: "전하영",
      company: "금오공과대학교",
      role: "학생",
    },
    {
      uid: 3,
      id: "jhy901",
      name: "전하영",
      company: "금오공과대학교",
      role: "학생",
    },
    {
      uid: 4,
      id: "jhy901",
      name: "전하영",
      company: "금오공과대학교",
      role: "학생",
    },
  ];
  const [currentUserId,setCurrentUserId] = useState(1);

  return (
    <>
      <UserCustomMenu USER_DATA={USER_DATA} currentUserId={currentUserId} setCurrentUserId={setCurrentUserId}/>
    </>
  );
}

export default UserCustomMenuContainer;
