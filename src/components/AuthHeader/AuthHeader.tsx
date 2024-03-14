// @ts-nocheck
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { signInWithGoogle, signOut, setUser } from "@/features/user/userSlice";
import { resetCities } from "@/features/cities/citiesSlice";

const AuthHeader = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(
    (state: RootState) => state.user?.userData?.email
  );

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(resetCities());
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("storedUser");
    if (storedUser !== null) {
      const storedUserObject = JSON.parse(storedUser);
      dispatch(setUser(storedUserObject));
    }
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "end", alignItems: "center" }}
    >
      {userEmail ? (
        <div
          onClick={handleSignOut}
          style={{
            width: "46px",
            height: "46px",
            backgroundColor: "blue",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "400",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          {userEmail.charAt(0).toUpperCase()}
        </div>
      ) : (
        <FcGoogle
          onClick={handleSignInWithGoogle}
          style={{ cursor: "pointer", fontSize: "46px" }}
        />
      )}
    </div>
  );
};

export default AuthHeader;
