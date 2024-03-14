import { useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, doc, setDoc } from "firebase/firestore";
import { RootState } from "../app/store";
import { database } from "@/firebase-config";

const useCitiesUpdate = () => {
  const cities = useSelector((state: RootState) => state.cities.citiesIds);
  const citiesInitialLoaded = useSelector((state: RootState) => state.cities.loaded);
  const userUid = useSelector((state: RootState) => state.user.userData?.uid);
  const value = collection(database, "citiesIds");

  useEffect(() => {
    if (userUid && citiesInitialLoaded) handleUpdate();
  }, [cities, userUid, citiesInitialLoaded]);

  const handleUpdate = async () => {
    const userDocRef = doc(value, userUid);
    await setDoc(userDocRef, { citiesIds: cities.join(",") });
  };

  return {
    handleUpdate
  };
};

export default useCitiesUpdate;
