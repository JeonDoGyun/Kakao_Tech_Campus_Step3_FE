import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { shelterSignupState } from 'recoil/shelterState';
import VSignupInputForm from './VSignupInputForm';

export interface EmailConfirmProps {
  isValid: boolean;
  checked: boolean;
}

// confirm state의 경우, 일치하지 않을 때 false
const SignupInputForm = () => {
  const [shelterInfo, setShelterInfo] = useRecoilState(shelterSignupState);
  const [emailConfirm, setEmailConfirm] = useState<EmailConfirmProps>({
    isValid: true,
    checked: false,
  });
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const { isValid, checked } = emailConfirm;

  const navigate = useNavigate();

  const duplicateCheck = () => {
    // shelterInfo.email
    fetch(`${process.env.REACT_APP_URI}/account/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: shelterInfo.email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!data.success) {
          alert(data.error.message); // 이 부분 어떻게 하죠?
          setEmailConfirm({
            isValid: false,
            checked: false,
          });
        } else {
          alert('사용 가능합니다.');
          setEmailConfirm({
            isValid: true,
            checked: true,
          });
        }
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    switch (target.id) {
      case 'email':
        setShelterInfo((prev) => ({ ...prev, email: target.value }));
        break;
      case 'password':
        setShelterInfo((prev) => ({ ...prev, password: target.value }));
        break;
      case 'shelter':
        setShelterInfo((prev) => ({ ...prev, name: target.value }));
        break;
      case 'shelter-contact':
        setShelterInfo((prev) => ({ ...prev, contact: target.value }));
        break;
      // 비밀번호 일치하지 않는 경우, 표시하기 위해 해당 부분 구현
      case 'password-confirm':
        if (target.value !== shelterInfo.password) {
          setPasswordConfirm(false);
        } else {
          setPasswordConfirm(true);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 중복 확인이 되지 않았을 때
    if (!emailConfirm.checked) {
      alert('이메일 중복을 확인해주세요');
    }
    // 제대로 확인되었을 때
    if (emailConfirm.isValid && passwordConfirm) {
      fetch(`${process.env.REACT_APP_URI}/account/shelter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...shelterInfo,
          email: shelterInfo.email,
          password: shelterInfo.password,
          name: shelterInfo.name,
          contact: shelterInfo.contact,
          zonecode: shelterInfo.zonecode,
          address: shelterInfo.address,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!data.success) {
            // alert(data.error.message);
            return;
          }
          navigate('/login');
        });
    }
  };

  const SignupInputFormProps = {
    shelterInfo,
    handleChange,
    handleSubmit,
    duplicateCheck,
    passwordConfirm,
    isValid,
    checked,
  };

  return <VSignupInputForm {...SignupInputFormProps} />;
};

export default SignupInputForm;
