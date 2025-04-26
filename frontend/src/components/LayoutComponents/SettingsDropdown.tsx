import { setUserSession } from "@/app/Features/AuthenticationSlice";
import { setTheme, theme } from "@/app/Features/MiscellaneousSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/Constants/Routes";
import { useFetchData } from "@/Hooks/useFetch";
import { avatarFallbackName } from "@/lib/utils";
import apiClient from "@/services/api";
import { GET_PROFILE, SIGNOUT } from "@/services/api/queries";
import { IUserData } from "@/types";
import Cookies from "js-cookie";
import { Check, Globe, LogOut, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SettingsDropdown() {
  const { t, i18n } = useTranslation("Layout");
  const locale = i18n.language;
  const dispatchRedux = useAppDispatch();
  const Theme = useAppSelector(theme);

  const handleLogout = async () => {
    await apiClient(SIGNOUT, {
      onSuccess() {
        Cookies.remove("Auth-State");
        dispatchRedux(setUserSession(null));

        window.location.replace(`/${locale}${routes.signin}`);
      },
    });
  };

  const { data: user } = useFetchData<IUserData>(GET_PROFILE, {
    queryOptions: { gcTime: Infinity },
  });

  // Get user initials for avatar fallback
  function changeLanguage(lang: string) {
    if (locale !== lang) {
      i18n.changeLanguage(lang);
      const temp = window.location.href.split("/");
      temp[3] = lang;
      console.log(temp);
      window.location.replace(temp.join("/"));
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer absolute top-3 right-3 z-50 ">
          <AvatarImage
            src="/placeholder.svg?height=32&width=32"
            alt={user?.image}
          />
          <AvatarFallback className="bg-accent text-white">
            {avatarFallbackName(user?.name ?? "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="focus:text-white">
              <Globe className="mr-2 h-4 w-4 focus:text-white" />
              <span>{t("Language")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={locale}
                  onValueChange={(value) => changeLanguage(value)}
                >
                  <DropdownMenuRadioItem
                    className="focus:text-white"
                    value="en"
                  >
                    {t("English")}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="focus:text-white"
                    value="ar"
                  >
                    {t("Arabic")}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="focus:text-white">
              {Theme === "dark" ? (
                <Moon className="mr-2 h-4 w-4" />
              ) : (
                <Sun className="mr-2 h-4 w-4" />
              )}
              <span>{t("Theme")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="focus:text-white"
                  onClick={() => dispatchRedux(setTheme("light"))}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  <span>{t("Light")}</span>
                  {Theme === "light" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="focus:text-white"
                  onClick={() => dispatchRedux(setTheme("dark"))}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  <span>{t("Dark")}</span>
                  {Theme === "dark" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className=" text-accent focus:text-white "
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("Log_out")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
