import { GithubIcon, GoogleIcon } from "@/shared/components/icons";

type SocialIcons = "google" | "github";

interface SocialData {
  type: SocialIcons;
  icon: React.FC;
  color: string;
  name: string;
  provider: string;
}

export const SOCIAL_ICONS_DATA: SocialData[] = [
  {
    type: "google",
    icon: GoogleIcon,
    color: "#DB4437",
    name: "Google",
    provider: "google",
  },
  {
    type: "github",
    icon: GithubIcon,
    color: "#1a1a1a",
    name: "Github",
    provider: "github",
  },
];
