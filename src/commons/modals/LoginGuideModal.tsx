import { setCookie } from 'commons/cookie/cookie';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginGuideModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const navigate = useNavigate();
  if (!isOpen) {
    return null;
  }
  return (
    <dialog
      className="absolute z-50 flex justify-center h-[20vh] bottom-2 rounded-lg border-2 border-gray-300 text-black"
      open={isOpen}
    >
      <div className="modal-content w-[600px] flex flex-col gap-4 justify-center">
        <div className="font-bold text-center text-lg">
          <div>자동으로 로그아웃 되었습니다.</div>
          <div>재로그인 하시겠습니까?</div>
        </div>
        <div className="flex justify-evenly font-bold">
          <button
            className="border-brand-color text-brand-color border-2 rounded-md px-4 py-1 transition duration-300 hover:bg-brand-color hover:text-white"
            onClick={() => {
              navigate('/login');
              setIsOpen(false);
            }}
          >
            로그인 하기
          </button>
          <button
            className="bg-brand-color text-white rounded-md px-4 py-1 transition duration-300 hover:bg-white hover:text-brand-color"
            onClick={() => {
              setIsOpen(false);
              setCookie('userAccountInfo', 'Not Login');
            }}
          >
            로그아웃 유지하기
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default LoginGuideModal;
