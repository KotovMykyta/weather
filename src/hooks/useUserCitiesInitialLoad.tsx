// @ts-nocheck
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { RootState } from "../app/store.js";
import { setCities, setLoading } from "../features/cities/citiesSlice.js";
import { database } from "@/firebase-config";

const useUserCitiesInitialLoad = () => {
  const dispatch = useDispatch();
  const userUid = useSelector((state: RootState) => state.user.userData?.uid);
  const value = collection(database, "citiesIds");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const querySnapshot = await getDocs(value);
        const citiesIds = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const userCitiesIds = citiesIds.find(
          (citiesId) => citiesId.id === userUid
        );
        if (userCitiesIds?.citiesIds) {
          const formattedCitiesIds = userCitiesIds.citiesIds
            .split(",")
            .map(Number);
          dispatch(setCities(formattedCitiesIds));
        }
        dispatch(setLoading(false));
      } catch (error: unknown) {
        console.error(`Error fetching cities: ${error.message}`);
        dispatch(setLoading(false));
      }
    };

    if (userUid) fetchData();
  }, [dispatch, userUid]);

  return null;
};

export default useUserCitiesInitialLoad;
