import { useState, useRef, useEffect } from "react";
import { uploadToCloudinary } from "../../utils/cloudinary";

/**
 * Props:
 *   value      {string}   - URL hiện tại (nếu đang sửa sách)
 *   onChange   {function} - Callback khi upload xong hoặc khi xóa ảnh, nhận secure_url hoặc rỗng
 *   disabled   {boolean}
 */
export default function ImageUploader({ value, onChange, disabled }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(value || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate phía client
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
    if (!ALLOWED.includes(file.type)) {
      setError("Chỉ chấp nhận JPG, PNG, WEBP");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Ảnh tối đa 5MB");
      return;
    }

    // Preview tức thì trước khi upload
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setError("");
    setUploading(true);
    setProgress(0);

    try {
      const cloudUrl = await uploadToCloudinary(file, setProgress);
      setPreview(cloudUrl);
      onChange(cloudUrl); // Trả URL thật về form cha
    } catch (err) {
      setError(err.message);
      setPreview(value || ""); // Rollback về ảnh cũ nếu lỗi
    } finally {
      setUploading(false);
      setProgress(0);
      // Reset input để có thể chọn lại cùng file
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleClear = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click kích hoạt input file
    if (disabled || uploading) return;
    setPreview("");
    onChange(""); // Truyền chuỗi rỗng về form cha để xóa ảnh bìa
  };

  return (
    <div className="space-y-2">
      {/* Vùng preview + click để chọn ảnh */}
      <div
        onClick={() => !disabled && !uploading && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg overflow-hidden cursor-pointer transition-colors group
          ${uploading ? "border-[#8B6508]/40 cursor-wait" : "border-[#D4C4A8] hover:border-[#8B6508]"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        style={{ aspectRatio: "3/4", maxWidth: "160px" }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Book cover preview"
              className="w-full h-full object-cover"
            />
            {/* Nút xóa ảnh */}
            {!disabled && !uploading && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-1.5 right-1.5 bg-red-600/80 hover:bg-red-700 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-200"
                title="Xóa ảnh"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 p-4 text-center">
            <span className="text-3xl mb-2">📷</span>
            <p className="text-xs font-serif">Chọn ảnh bìa</p>
          </div>
        )}

        {/* Overlay khi đang upload */}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
            <p className="text-white text-xs font-bold mb-2">{progress}%</p>
            <div className="w-3/4 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B6508] transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Badge thay đổi ảnh khi đã có preview */}
        {preview && !uploading && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-black/50 px-2 py-1 rounded transition-opacity duration-200">
              Thay đổi
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="hidden"
      />

      {error && (
        <p className="text-red-600 text-xs font-serif italic">{error}</p>
      )}

      {/* Hiển thị URL đã upload */}
      {value && !uploading && (
        <p className="text-[10px] text-stone-400 font-mono break-all line-clamp-1" title={value}>
          ✓ {value.split("/").pop()}
        </p>
      )}
    </div>
  );
}
