const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

/**
 * Upload ảnh lên Cloudinary (Unsigned Upload).
 * @param {File} file - File ảnh người dùng chọn
 * @param {function} onProgress - Callback nhận % tiến trình (0-100)
 * @returns {Promise<string>} - secure_url của ảnh trên Cloudinary
 */
export async function uploadToCloudinary(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "bookstore/books");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.secure_url);
      } else {
        reject(new Error("Upload thất bại: " + xhr.statusText));
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Lỗi mạng khi upload")));
    xhr.addEventListener("abort", () => reject(new Error("Upload bị huỷ")));

    xhr.open("POST", UPLOAD_URL);
    xhr.send(formData);
  });
}
