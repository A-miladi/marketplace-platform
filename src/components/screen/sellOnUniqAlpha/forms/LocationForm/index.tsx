import { Spinner } from "@/components/ui";
import TextInput from "@/components/ui/TextInput";
import { AdvertisementFormData, LocationLatLng } from "@/types/advertisement";
import dynamic from "next/dynamic";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";

const MapWithSearch = dynamic(() => import("@/components/Map"), { ssr: false });

interface LocationFormProps {
  location: LocationLatLng | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationLatLng | null>>;
  errors: FieldErrors<AdvertisementFormData>;
  setValue: UseFormSetValue<AdvertisementFormData>;
  trigger: UseFormTrigger<AdvertisementFormData>;
  zipCode: string;
  setZipCode: Dispatch<SetStateAction<string>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
}

const LocationForm = ({
  location,
  setLocation,
  errors,
  setValue,
  trigger,
  zipCode,
  setZipCode,
  address,
  setAddress,
}: LocationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddressByZipCode = async (zip: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zip}&format=json`,
      );
      const data = await response.json();

      if (data && data[0]) {
        const { lat, lon, display_name } = data[0];
        return {
          coordinates: { lat: parseFloat(lat), lng: parseFloat(lon) },
          address: display_name,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching address by zip code:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleZipCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
    setValue("zip_code", value);

    if (value.length >= 4) {
      setAddress(""); // Clear address while loading
      const result = await fetchAddressByZipCode(value);
      if (result) {
        setLocation(result.coordinates);
        setAddress(result.address);
        setValue("address", result.address);
        await trigger("address");
        await trigger("zip_code");
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-4 lg:pt-6">
      <div className="flex flex-col gap-4">
        <TextInput
          label="Zip Code"
          parent="w-full"
          placeholder="Enter zip code"
          value={zipCode}
          onChange={handleZipCodeChange}
          error={!!errors?.zip_code}
          helperText={errors?.zip_code?.message}
          className="h-10 border border-neutral-400 bg-white text-sm font-normal md:h-12"
          labelClassName="mb-3 lg:mb-4 font-normal text-sm lg:font-medium lg:text-base"
        />

        <div className="relative w-full">
          <TextInput
            readOnly
            label="Address"
            parent="w-full"
            placeholder="Address will be filled automatically"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setValue("address", e.target.value);
            }}
            error={!!errors?.address}
            helperText={errors?.address?.message}
            className="h-10 border border-neutral-400 bg-white text-sm font-normal md:h-12"
            labelClassName="mb-3 lg:mb-4 font-normal text-sm lg:font-medium lg:text-base"
          />
          {isLoading && (
            <div className="absolute inset-0 top-7 flex items-center justify-center bg-white/50">
              <Spinner size="small" />
            </div>
          )}
        </div>
      </div>

      <MapWithSearch location={location} setLocation={setLocation} />
    </div>
  );
};

export default LocationForm;
