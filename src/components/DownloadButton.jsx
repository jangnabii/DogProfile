import './DownloadButton.css';

export default function DownloadButton({ onClick, disabled }) {
  return (
    <div className="download-section">
      <button
        id="download-btn"
        className="download-btn"
        onClick={onClick}
        disabled={disabled}
        type="button"
      >
        다운로드하기
      </button>
    </div>
  );
}
