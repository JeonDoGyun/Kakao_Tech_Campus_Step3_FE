import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

type AddressProps = {
  zonecode: string;
  sido: string;
  sigungu: string;
  roadname: string;
  detail: string;
};

interface StateProps {
  userAddress: AddressProps;
  setUserAddress: React.Dispatch<React.SetStateAction<AddressProps>>;
}

const Postcode = ({ userAddress, setUserAddress }: StateProps) => {
  const scriptUrl =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // roadname에서 sido + sigungu를 빼야 도로명 주소 전체가 나옴
    const roadname = fullAddress.replace(`${data.sido} ${data.sigungu} `, '');

    setUserAddress({
      ...userAddress,
      zonecode: data.zonecode,
      sido: data.sido,
      sigungu: data.sigungu,
      roadname,
    });
    // 여기서 data 형식 확인하기, 나중에 확인할 수도 있으니 주석처리
    // console.log('Data', data);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button
      className="bg-brand-color text-white rounded  min-w-[120px] p-1"
      onClick={handleClick}
    >
      우편번호 찾기
    </button>
  );
};

export default Postcode;
