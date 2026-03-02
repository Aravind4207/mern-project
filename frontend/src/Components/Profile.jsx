import { useEffect, useState } from "react";
import { getProfile } from "../api/Auth";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user && <p>{user.name} - {user.email}</p>}
    </div>
  );
}

export default Profile;