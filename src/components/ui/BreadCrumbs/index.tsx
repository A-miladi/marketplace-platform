"use client";

import { ArrowDown } from "@/components/icons";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface BreadcrumbsProps {
  homeLabel?: string;
  separator?: string | React.ReactNode;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  homeLabel,
  separator = <ArrowDown color="black" size={18} className="-rotate-90" />,
}) => {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("breadcrumbs");

  if (!pathname) return null;

  const { locale } = params as { locale: string };

  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment && segment !== locale);

  return (
    <nav aria-label="breadcrumb">
      <ul className="flex items-center gap-2">
        <li>
          <p className="text-xs text-neutral-400">{homeLabel || t("home")}</p>
        </li>

        {pathSegments.length > 0 && <li>{separator}</li>}

        {pathSegments.map((segment, index) => {
          const href = `/${locale}/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="text-xs text-neutral-400">
                {t(segment) || segment}
              </span>
              {!isLast && <span className="">{separator}</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
