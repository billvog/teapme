import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsPinterest,
  BsReddit,
  BsSnapchat,
  BsTiktok,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import parseUrl from "parse-url";
import { IconType } from "react-icons/lib";

export type SocialLink = {
  platform: string;
  baseUrl: string;
  icon: IconType;
};

const SocialLinks: SocialLink[] = [
  {
    platform: "twitter",
    baseUrl: "twitter.com",
    icon: BsTwitterX,
  },
  {
    platform: "github",
    baseUrl: "github.com",
    icon: BsGithub,
  },
  {
    platform: "facebook",
    baseUrl: "facebook.com",
    icon: BsFacebook,
  },
  {
    platform: "instagram",
    baseUrl: "instagram.com",
    icon: BsInstagram,
  },
  {
    platform: "linkedin",
    baseUrl: "linkedin.com",
    icon: BsLinkedin,
  },
  {
    platform: "youtube",
    baseUrl: "youtube.com",
    icon: BsYoutube,
  },
  {
    platform: "pinterest",
    baseUrl: "pinterest.com",
    icon: BsPinterest,
  },
  {
    platform: "tiktok",
    baseUrl: "tiktok.com",
    icon: BsTiktok,
  },
  {
    platform: "snapchat",
    baseUrl: "snapchat.com",
    icon: BsSnapchat,
  },
  {
    platform: "reddit",
    baseUrl: "reddit.com",
    icon: BsReddit,
  },
];

export const getSocialPlatform = (url: string) => {
  try {
    const parsed = parseUrl(url);
    const platform = SocialLinks.find((link) =>
      parsed.resource.includes(link.baseUrl),
    );
    return platform ?? null;
  } catch (error) {
    return null;
  }
};

export const formatClickCount = (count: number) => {
  const shortFormatter = Intl.NumberFormat("en", { notation: "compact" });
  const longFormatter = Intl.NumberFormat("en", {
    notation: "standard",
  });

  return {
    short: shortFormatter.format(count),
    long: longFormatter.format(count),
  };
};
