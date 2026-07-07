import { forwardRef } from 'react';
import './DogCard.css';

const DogCard = forwardRef(function DogCard({ dogInfo }, ref) {
  const {
    nameKo,
    nameEn,
    regNumber,
    breed,
    gender,
    birthYear,
    birthMonth,
    birthDay,
    guardian,
    photo,
  } = dogInfo;

  // Format birth date
  const birthDate =
    birthYear && birthMonth && birthDay
      ? `${birthYear}.${String(birthMonth).padStart(2, '0')}.${String(birthDay).padStart(2, '0')}.`
      : '';

  // Format today's date for issue date
  const today = new Date();
  const issueDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  // Gender text
  const genderText = gender === '남' ? '남' : gender === '여' ? '여' : '';

  // Build breed + gender string
  const breedGender = breed
    ? genderText
      ? `${breed}(${genderText})`
      : breed
    : genderText
      ? `(${genderText})`
      : '';

  return (
    <div className="card-wrapper">
      <div className="dog-card" ref={ref} id="dog-card-capture">
        <div className="card-content">
          {/* Decorative gold birds */}
          <div className="card-deco-bird">𓅂 𓅃 𓅄</div>

          {/* Header */}
          <div className="card-header">
            <span className="card-title">강아지 등록증</span>
          </div>

          {/* Body */}
          <div className="card-body">
            {/* Info section */}
            <div className="card-info">
              <div className="card-info-detail card-name">
                {nameKo || '이름'}
                {nameEn ? ` (${nameEn})` : ''}
              </div>
              <div className="card-info-detail">
                {regNumber || '000000000000000'}
              </div>
              <div className="card-info-detail">
                {breedGender || '견종'}
              </div>
              <div className="card-info-detail">
                {birthDate || '0000.00.00.'}
              </div>
              <div className="card-info-detail">
                {guardian ? `보호자 ${guardian}` : '보호자 ___'}
              </div>
            </div>

            {/* Photo section - Only renders when a photo exists */}
            {photo && (
              <div className="card-photo-area">
                <img src={photo} alt={`${nameKo || '강아지'} 증명사진`} />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="card-footer">
            <div className="card-issue-info">
              <span className="card-issue-date">{issueDate}</span>
              <span className="card-issue-org">대한민국 멍멍이 협회장</span>
            </div>

            {/* Stamp */}
            <div className="card-stamp">
              <span className="card-stamp-text-top">대한민국 멍멍이</span>
              <span className="card-stamp-paw">🐾</span>
              <span className="card-stamp-text-bottom">(unofficial)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DogCard;
