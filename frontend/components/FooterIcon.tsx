"use client"
import {Icon} from "@iconify/react";
import type {IconProps} from "@iconify/react";
import {Link} from "@nextui-org/react"
type SocialIconProps = Omit<IconProps, "icon">;
export default function FooterIcons(){
    const socialItems = [
        {
          name: "Facebook",
          href: "#",
          icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:facebook" />,
        },
        {
          name: "Instagram",
          href: "#",
          icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:instagram" />,
        },
        {
          name: "Twitter",
          href: "#",
          icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:twitter" />,
        },
        {
          name: "YouTube",
          href: "#",
          icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:youtube" />,
        },
      ];
      return(
        <div className="flex gap-3 justify-start p-0">
        {socialItems.map((item) => (
            <Link key={item.name} className="text-default-400" href={item.href}>
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="w-5" />
            </Link>
          ))}
          </div>
        )
}