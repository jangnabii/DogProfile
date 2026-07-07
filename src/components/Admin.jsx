import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './Admin.css';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // 인증 전 화면
  if (!isAuthenticated) {
    return (
      <div className="admin-container" style={{ textAlign: 'center', paddingTop: '10vh' }}>
        <h2>관리자 로그인</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>비밀번호를 입력해주세요.</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
          } else {
            alert('비밀번호가 틀렸습니다.');
          }
        }}>
          <input 
            type="password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '1rem', borderRadius: '8px', background: '#ff8eaf', color: 'white', border: 'none', cursor: 'pointer' }}>
            확인
          </button>
        </form>
        <div style={{ marginTop: '30px' }}>
          <a href="/" className="back-link">메인으로 가기</a>
        </div>
      </div>
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, "dogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecords(data);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const totalCount = records.length;
  const breeds = records.map((r) => r.breedCustom ? r.breedCustom : r.breed);
  const topBreed = breeds.length > 0 
    ? Object.entries(breeds.reduce((acc, curr) => ({...acc, [curr]: (acc[curr] || 0) + 1}), {})).sort((a,b)=>b[1]-a[1])[0][0]
    : '없음';

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>강아지 등록증 관리자</h1>
        <a href="/" className="back-link">메인으로 가기</a>
      </header>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>총 발급 건수</h3>
          <p className="stat-value">{totalCount}건</p>
        </div>
        <div className="stat-card">
          <h3>가장 인기있는 견종</h3>
          <p className="stat-value">{topBreed}</p>
        </div>
      </div>

      <div className="table-container">
        <h2>최근 발급 내역</h2>
        {loading ? (
          <p className="empty-message">데이터를 불러오는 중입니다...</p>
        ) : records.length === 0 ? (
          <p className="empty-message">아직 발급된 등록증이 없습니다.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>발급일</th>
                <th>이름</th>
                <th>견종</th>
                <th>보호자</th>
                <th>등록번호</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.createdAt).toLocaleString('ko-KR')}</td>
                  <td>{record.nameKo} ({record.nameEn})</td>
                  <td>{record.breedCustom || record.breed}</td>
                  <td>{record.guardian}</td>
                  <td>{record.regNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
