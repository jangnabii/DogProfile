import { useRef } from 'react';
import './InputForm.css';

const BREED_LIST = [
  '말티푸',
  '푸들',
  '말티즈',
  '포메라니안',
  '비숑',
  '치와와',
  '시츄',
  '요크셔테리어',
  '골든리트리버',
  '웰시코기',
  '믹스견',
  '직접 입력',
];

export default function InputForm({ dogInfo, onChange }) {
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    onChange({ ...dogInfo, [field]: value });
  };

  const handleBreedSelect = (e) => {
    const val = e.target.value;
    if (val === '직접 입력') {
      handleChange('breedCustom', true);
      handleChange('breed', '');
    } else {
      handleChange('breedCustom', false);
      handleChange('breed', val);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      handleChange('photo', ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Generate year options (2000 ~ current year)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 2000; y--) {
    years.push(y);
  }

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="form-section">
      <h2 className="form-section-title">강아지의 정보를 입력해주세요</h2>

      <div className="form-container">
        <div className="form-layout">
          {/* Left: Form Fields */}
          <div className="form-fields">
            {/* 강아지 이름 (한글) */}
            <div className="form-row">
              <label className="form-label" htmlFor="name-ko">강아지 이름</label>
              <input
                id="name-ko"
                className="form-input"
                type="text"
                placeholder="장찹쌀"
                value={dogInfo.nameKo}
                onChange={(e) => handleChange('nameKo', e.target.value)}
              />
            </div>

            {/* 영어 이름 */}
            <div className="form-row">
              <label className="form-label" htmlFor="name-en">영어 이름</label>
              <input
                id="name-en"
                className="form-input"
                type="text"
                placeholder="Jang Chapssal"
                value={dogInfo.nameEn}
                onChange={(e) => handleChange('nameEn', e.target.value)}
              />
            </div>

            {/* 등록번호 */}
            <div className="form-row">
              <label className="form-label" htmlFor="reg-number">등록번호</label>
              <input
                id="reg-number"
                className="form-input"
                type="text"
                placeholder="000-0000"
                value={dogInfo.regNumber}
                onChange={(e) => handleChange('regNumber', e.target.value)}
              />
            </div>

            {/* 견종 + 성별 */}
            <div className="form-row">
              <label className="form-label">견종 (성별)</label>
              <div className="breed-row">
                {dogInfo.breedCustom ? (
                  <input
                    className="form-input"
                    type="text"
                    placeholder="견종을 입력하세요"
                    value={dogInfo.breed}
                    onChange={(e) => handleChange('breed', e.target.value)}
                    autoFocus
                  />
                ) : (
                  <select
                    className="form-select"
                    value={dogInfo.breed || ''}
                    onChange={handleBreedSelect}
                  >
                    <option value="" disabled>
                      견종 선택
                    </option>
                    {BREED_LIST.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                )}

                <div className="gender-toggle">
                  <button
                    type="button"
                    className={`gender-btn ${dogInfo.gender === '남' ? 'active' : ''}`}
                    onClick={() => handleChange('gender', '남')}
                  >
                    남아
                  </button>
                  <button
                    type="button"
                    className={`gender-btn ${dogInfo.gender === '여' ? 'active' : ''}`}
                    onClick={() => handleChange('gender', '여')}
                  >
                    여아
                  </button>
                </div>
              </div>
            </div>

            {/* 생년월일 */}
            <div className="form-row">
              <label className="form-label">생년월일</label>
              <div className="birth-selects">
                <select
                  className="form-select"
                  value={dogInfo.birthYear || ''}
                  onChange={(e) => handleChange('birthYear', e.target.value)}
                >
                  <option value="" disabled>년</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <span className="birth-label">년</span>

                <select
                  className="form-select"
                  value={dogInfo.birthMonth || ''}
                  onChange={(e) => handleChange('birthMonth', e.target.value)}
                >
                  <option value="" disabled>월</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <span className="birth-label">월</span>

                <select
                  className="form-select"
                  value={dogInfo.birthDay || ''}
                  onChange={(e) => handleChange('birthDay', e.target.value)}
                >
                  <option value="" disabled>일</option>
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <span className="birth-label">일</span>
              </div>
            </div>

            {/* 보호자 */}
            <div className="form-row">
              <label className="form-label" htmlFor="guardian">보호자</label>
              <input
                id="guardian"
                className="form-input"
                type="text"
                placeholder="나라누나"
                value={dogInfo.guardian}
                onChange={(e) => handleChange('guardian', e.target.value)}
              />
            </div>
          </div>

          {/* Right: Photo upload */}
          <div
            className={`photo-upload-area ${dogInfo.photo ? 'has-photo' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          >
            {dogInfo.photo ? (
              <>
                <img src={dogInfo.photo} alt="업로드된 강아지 사진" />
                <div className="photo-change-overlay">사진 변경</div>
              </>
            ) : (
              <>
                <span className="photo-upload-icon">+</span>
                <span className="photo-upload-text">사진추가하기</span>
              </>
            )}
            <input
              ref={fileInputRef}
              className="photo-upload-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
