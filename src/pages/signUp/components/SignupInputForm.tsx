import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as Yup from 'yup';
import { ShelterSignupType, shelterSignupState } from 'recoil/shelterState';
import {
  EmailConfirmProps,
  EmailValidationProps,
  LoadingProps,
} from '../signupType';
import VSignupInputForm from './VSignupInputForm';

const SignupInputForm = () => {
  const [shelterInfo, setShelterInfo] = useRecoilState(shelterSignupState);
  const [emailConfirm, setEmailConfirm] = useState<EmailConfirmProps>({
    isValid: false,
    checked: false,
  });
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const [emailValidText, setEmailValidText] = useState('');
  const [emailInValidText, setEmailInValidText] = useState('');

  const [errors, setErrors] = useState<Partial<ShelterSignupType>>({});
  const [isLoading, setIsLoading] = useState<LoadingProps>({
    submitIsLoading: false,
    duplicateCheckIsLoading: false,
  });

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('이메일 형식에 맞게 입력해주세요.')
      .required('이메일을 입력해주세요.'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])/,
        '적어도 1개 이상의 영문 소문자가 포함되어야 합니다.',
      )
      .matches(
        /^(?=.*[A-Z])/,
        '적어도 1개 이상의 영문 대문자가 포함되어야 합니다.',
      )
      .matches(/^(?=.*\d)/, '적어도 1개 이상의 숫자가 포함되어야 합니다.')
      .matches(
        /^(?=.*[@$!%*?&])/,
        '적어도 1개 이상의 특수기호가 포함되어야 합니다.',
      )
      .matches(
        /^[A-Za-z\d@$!%*?&]{8,20}$/,
        '비밀번호는 8자에서 20자 사이여야 합니다.',
      )
      .required('비밀번호를 입력해주세요.'),
    passwordConfirm: Yup.string()
      .required('비밀번호 확인은 필수 입력 사항입니다.')
      .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
    name: Yup.string().required('보호소 이름을 입력해주세요.'),
    contact: Yup.string().required(
      '보호소에 연락 가능한 연락처를 입력해주세요.',
    ),
  });

  /** 회원가입 전 이메일 중복 검사를 완료했는지 / 검사 결과 적합했는지 확인
   * @param {string} validText : 적합한 경우 화면에 나타날 Text
   * @param {string} inValidText : 부적합한 경우 화면에 나타날 Text
   * @param {object} emailConfirmObj : 중복 검사 시행 확인 / 적합, 부적합을 판단하는 객체
   * @param {boolean} emailConfirmObj.isValid 적합(true), 부적합(false)을 판단
   * @param {boolean} emailConfirmObj.checked 중복 검사 시행(true) 확인
   */
  const getEmailValidText = ({
    validText,
    inValidText,
    emailConfirmObj,
  }: EmailValidationProps) => {
    setEmailValidText(validText);
    setEmailInValidText(inValidText);
    setEmailConfirm(emailConfirmObj);
  };

  // 이메일 중복 검사 api
  const duplicateCheck = async () => {
    setIsLoading((prev) => ({ ...prev, duplicateCheckIsLoading: true }));
    const response = await fetch(`${process.env.REACT_APP_URI}/account/email`, {
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
          getEmailValidText({
            validText: '',
            inValidText: data.error.message,
            emailConfirmObj: {
              isValid: false,
              checked: false,
            },
          });
        } else if (!shelterInfo.email) {
          getEmailValidText({
            validText: '',
            inValidText: '',
            // 안 넣으면 빈칸으로 공간 차지해서 이렇게 조건 넣어줌
            emailConfirmObj: {
              isValid: false,
              checked: true,
            },
          });
        } else {
          getEmailValidText({
            validText: '사용 가능한 이메일입니다.',
            inValidText: '',
            emailConfirmObj: {
              isValid: true,
              checked: true,
            },
          });
        }
      });
    setIsLoading((prev) => ({ ...prev, duplicateCheckIsLoading: false }));
  };

  const userFetch = () => {
    // 중복 확인이 되지 않았을 때
    if (!emailConfirm.checked) {
      alert('이메일 중복을 확인해주세요');
      setIsLoading((prev) => ({ ...prev, submitIsLoading: false }));
    }
    // 제대로 확인되었을 때
    if (emailConfirm.isValid && emailConfirm.checked) {
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
            alert(data.error.message); // 이 부분은 주소 받는 거 때문에 그냥 텍스트만 넣기 애매함
          } else {
            navigate('/login');
          }
        });
      setIsLoading((prev) => ({ ...prev, submitIsLoading: false }));
    }
  };

  // input에 들어가는 value에 따라 recoilState인 shelterInfo의 값 갱신
  // 비밀번호 일치하지 않는 경우 에러 텍스트 표시
  // 나머지 case의 경우, input value를 저장하는 용도로만 사용하기 때문에 default로 설정
  const getInputValue = (target: HTMLInputElement) => {
    const inputKey = target.dataset.inputType as string;
    switch (inputKey) {
      case 'password-confirm':
        if (target.value !== shelterInfo.password) {
          setPasswordConfirm(false);
        } else {
          setPasswordConfirm(true);
        }
        break;
      default:
        setShelterInfo((prev) => ({ ...prev, [inputKey]: target.value }));
        break;
    }
  };

  // yup을 통해 input value의 validation check 후 errorText를 errors state에 저장
  const validationCheck = () => {
    validationSchema
      .validate(shelterInfo, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((err) => {
        const newErrors: Partial<ShelterSignupType> = {};
        err.inner.forEach(
          (er: {
            path: string;
            message:
              | (string & {
                  province: string;
                  city: string;
                  roadName: string;
                  detail: string;
                })
              | undefined;
          }) => {
            newErrors[er.path as keyof ShelterSignupType] = er.message;
          },
        );
        setErrors(newErrors);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    getInputValue(target);
  };

  /** 회원가입 버튼 onSubmit handler
   * 유효성 검사 시행
   * userFetch가 동작하는 동안 Loader를 보여주기 위해 isLoading state 사용
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validationCheck();
    setIsLoading((prev) => ({ ...prev, submitIsLoading: true }));
    userFetch();
  };

  const SignupInputFormProps = {
    handleChange,
    handleSubmit,
    duplicateCheck,
    emailValidText,
    emailInValidText,
    passwordConfirm,
    errors,
    isLoading,
  };

  return <VSignupInputForm {...SignupInputFormProps} />;
};

export default SignupInputForm;