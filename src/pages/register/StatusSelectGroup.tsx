import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import registerState from 'recoil/registerState';
import StatusScore from './StatusScore';

const StatusSelectGroup = () => {
  const [profileStatus, setProfileStatus] = useRecoilState(registerState);
  const { petPolygonProfileDto } = profileStatus;

  const [intelligenceOption, setIntelligenceOption] = useState(3);
  const [affinityOption, setAffinityOption] = useState(3);
  const [athleticOption, setAthleticOption] = useState(3);
  const [adaptabilityOption, setAdaptabilityOption] = useState(3);
  const [activenessOption, setActivenessOption] = useState(3);

  const handleOptionChange = (status: string, option: number) => {
    switch (status) {
      case 'intelligence':
        setIntelligenceOption(option);
        setProfileStatus((prev) => ({
          ...prev,
          petPolygonProfileDto: {
            ...prev.petPolygonProfileDto,
            intelligence: option,
          },
        }));
        break;
      case 'affinity':
        setAffinityOption(option);
        setProfileStatus((prev) => ({
          ...prev,
          petPolygonProfileDto: {
            ...prev.petPolygonProfileDto,
            affinity: option,
          },
        }));
        break;
      case 'athletic':
        setAthleticOption(option);
        setProfileStatus((prev) => ({
          ...prev,
          petPolygonProfileDto: {
            ...prev.petPolygonProfileDto,
            athletic: option,
          },
        }));
        break;
      case 'adaptability':
        setAdaptabilityOption(option);
        setProfileStatus((prev) => ({
          ...prev,
          petPolygonProfileDto: {
            ...prev.petPolygonProfileDto,
            adaptability: option,
          },
        }));
        break;
      case 'activeness':
        setActivenessOption(option);
        setProfileStatus((prev) => ({
          ...prev,
          petPolygonProfileDto: {
            ...prev.petPolygonProfileDto,
            activeness: option,
          },
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <StatusScore
        status={'영리함'}
        score={petPolygonProfileDto.intelligence}
        selectedOption={intelligenceOption}
        handleChange={handleOptionChange}
      />
      <StatusScore
        status={'친화력'}
        score={petPolygonProfileDto.affinity}
        selectedOption={affinityOption}
        handleChange={handleOptionChange}
      />
      <StatusScore
        status={'운동신경'}
        score={petPolygonProfileDto.athletic}
        selectedOption={athleticOption}
        handleChange={handleOptionChange}
      />
      <StatusScore
        status={'적응력'}
        score={petPolygonProfileDto.adaptability}
        selectedOption={adaptabilityOption}
        handleChange={handleOptionChange}
      />
      <StatusScore
        status={'활발함'}
        score={petPolygonProfileDto.activeness}
        selectedOption={activenessOption}
        handleChange={handleOptionChange}
      />
    </div>
  );
};

export default StatusSelectGroup;
