import Pagination from 'commons/components/VPagenation';
import ProfileCard from 'pages/profileList/components/ProfileCard';
import { getCookie } from 'commons/cookie/cookie';
import VShelterCard from './VShelterCard';
import { ShelterInfoPageProps } from '../shelterInfoType';

const VShelterInfo = (props: ShelterInfoPageProps) => {
  const loginAccount = getCookie('accountInfo');
  const role = loginAccount ? loginAccount.split(' ')[0] : '';
  const id = loginAccount ? loginAccount.split(' ')[1] : '';

  return (
    <div>
      <div className="mt-8 sm:mt-20">
        <VShelterCard {...props.shelterInfoProps} />
      </div>
      <div className="mx-16 sm:mx-40 lg:mx-64 my-14">
        <h2 className="flex w-full font-bold text-xl sm:text-2xl items-center mb-5 whitespace-nowrap">
          관리중인 동물
        </h2>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 my-1 w-full whitespace-nowrap">
          {props.profileProps.map((item, index) => (
            <div className="flex flex-row" key={index}>
              <ProfileCard
                key={index}
                petId={item.id}
                petName={item.name}
                petAge={item.age}
                shelterName={''}
                {...item}
              />
              <button
                className={`${
                  loginAccount &&
                  role === 'SHELTER' &&
                  id === `${props.shelterInfoProps.id}`
                    ? ' absolute ml-60 bg-slate-200 text-sm h-fit w-fit p-1  rounded-xl '
                    : ' text-transparent '
                }`}
                onClick={() => {
                  // eslint-disable-next-line no-restricted-globals
                  location.href = `/pet-update/${item.id}`;
                }}
              >
                수정하기
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5 mb-11 sm:mb-28">
        <Pagination
          currentPage={props.pageNationProps.currentPage}
          lastPage={props.pageNationProps.lastPage}
          maxLength={7}
          setCurrentPage={props.pageNationProps.setCurrentPage}
        />
      </div>
    </div>
  );
};

export default VShelterInfo;
