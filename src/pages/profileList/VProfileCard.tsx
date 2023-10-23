export interface VProfileInfoProps {
  profileImageUrl: string;
  petId: number;
  petName: string;
  petAge: number | null;
  shelterName: string;
  adoptionStatus: string;
}

const VProfileCard = (vProfileInfoProps: VProfileInfoProps) => (
  <div className="flex flex-col items-center justify-center m-5 flex-nowrap">
    <a
      href={`/pet/${vProfileInfoProps.petId}`}
      className="flex items-center justify-start gap-6 w-64 h-24"
    >
      <img
        className="flex w-1/3 cursor-pointer "
        src={vProfileInfoProps.profileImageUrl}
        alt=""
      />
      <div className=" whitespace-nowrap">
        <div className="flex flex-row items-center">
          {vProfileInfoProps.petName}
          <div className="flex ml-4 text-sm text-brand-color">
            {vProfileInfoProps.petAge}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {vProfileInfoProps.shelterName}
        </div>
        <div className=" font-semibold">{vProfileInfoProps.adoptionStatus}</div>
      </div>
    </a>
    <hr className="mt-4 w-4/6 h-1"></hr>
  </div>
);

export default VProfileCard;
