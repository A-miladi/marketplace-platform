"use client";

import { Search } from "@/components/icons";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import SearchInput from "./SearchInput.tsx";

export const SearchBar = () => {
  const t = useTranslations("Header");
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathName = usePathname();

  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "");
  const [address, setAddress] = useState(searchParams?.get("address") || "");

  const updateUrlParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`/advertisement?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleSearch = useCallback(() => {
    const updates: Record<string, string | null> = {};

    // Only add search query if it's at least 2 characters
    if (searchQuery.length >= 1) {
      updates.q = searchQuery;
    } else {
      updates.q = null;
    }

    // Only add city if it's not empty
    if (address) {
      updates.address = address;
    } else {
      updates.address = null;
    }

    updateUrlParams(updates);
  }, [searchQuery, address, updateUrlParams]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");

    if (pathName?.includes("advertisement")) {
      updateUrlParams({ q: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUrlParams]);

  const clearCity = useCallback(() => {
    setAddress("");
    if (pathName?.includes("advertisement")) {
      updateUrlParams({ address: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUrlParams]);

  return (
    <div className="absolute top-2 mx-5 grid h-12 grid-cols-5 items-center gap-2 rounded-xl bg-white px-2 shadow-uniq_shadow md:top-3 md:mx-0 md:h-20 md:grid-cols-9 md:gap-4 md:rounded-2xl md:px-5">
      <div className="col-span-2 max-h-12 md:col-span-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={clearSearch}
          onSearch={handleSearch}
          placeholder={t("ManufacturerAndModel")}
        />
      </div>

      <div className="col-span-2 md:col-span-3">
        <SearchInput
          value={address}
          onChange={setAddress}
          onClear={clearCity}
          onSearch={handleSearch}
          placeholder={t("CityStateOrCountry")}
        />
      </div>

      <Button
        color="primary"
        className="col-span-1 flex max-h-12 min-h-8 w-full items-center justify-center transition-transform hover:scale-105 md:col-span-2 md:h-full md:py-3.5"
        onClick={handleSearch}
        aria-label="Search"
      >
        <p className="text-center text-sm text-white">{t("search")}</p>
        <Search color="white" size={24} className="hidden lg:block" />
      </Button>
    </div>
  );
};
