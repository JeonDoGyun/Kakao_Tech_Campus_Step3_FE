export interface VProfileInfoProps {
  profileImageUrl: string;
  petId: number;
  petName: string;
  petAge: number | null;
  shelterName: string;
  adoptionStatus: string;
}

const ProfileCard = (vProfileInfoProps: VProfileInfoProps) => (
  <div className="flex flex-col items-center justify-center m-1 flex-nowrap">
    <a
      href={`/pet/${vProfileInfoProps.petId}`}
      className="flex items-center justify-start gap-6 w-auto h-24 ml-10"
    >
      <div className="flex justify-center w-24 h-full">
        <img
          className="flex object-cover w-full h-full cursor-pointer "
          src={vProfileInfoProps.profileImageUrl}
          alt=""
        />
      </div>
      <div className=" w-44 whitespace-nowrap">
        <div className="flex flex-row items-center">
          {vProfileInfoProps.petName}
          <div className="flex ml-4 text-sm text-brand-color">
            {vProfileInfoProps.petAge}
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {vProfileInfoProps.shelterName}
        </div>
        <div className=" text-sm font-semibold">
          {vProfileInfoProps.adoptionStatus}
        </div>
      </div>
    </a>
    <hr className=" w-9/12 h-1 mt-4"></hr>
  </div>
);

export default ProfileCard;
