import { userSession, userData } from "@/app/Features/AuthenticationSlice";
import { useAppSelector } from "@/app/reduxHooks";

export default function UseAuth() {
  const UserData = useAppSelector(userData);
  const UserSession = useAppSelector(userSession);

  return { UserSession, UserData };
}
