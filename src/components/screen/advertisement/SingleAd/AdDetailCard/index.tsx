interface DetailCardProps {
  label: string;
  value: string | number | undefined;
}

const AdDetailCard = ({ label, value }: DetailCardProps) => {
  return (
    <div className="flex w-full justify-between gap-8 rounded-md bg-neutral-50 px-3 py-[14px]">
      <p className="text-xs font-normal text-neutral-950 md:text-xl">{label}</p>
      <p className="text-xs font-normal text-neutral-950 md:text-xl lg:font-bold">
        {value}
      </p>
    </div>
  );
};

export default AdDetailCard;
