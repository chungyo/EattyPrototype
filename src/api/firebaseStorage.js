// api/firebaseStorage.js
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Firebase storage 설정
const storage = getStorage();

// 이미지 URL을 가져오는 함수
export const fetchImageURL = async (imagePath) => {
    const storageRef = ref(storage, imagePath);
    try {
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error("Error fetching image URL:", error);
        throw error;
    }
};
