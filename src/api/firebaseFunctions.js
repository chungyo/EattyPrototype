    import {db, functions, storage, analytics} from './firebase';
    import {collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc, updateDoc, where, query} from 'firebase/firestore';
    import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
    import {logEvent} from "firebase/analytics";

    const tasteTypeMap = {
        0: "아재입맛",
        1: "딩초입맛",
        2: "디저트 마니아",
        3: "밥돌이",
        4: "한식 전도사",
        5: "글로벌 푸디",
        6: "도파민 중독자",
        7: "장수 유망주"
    };

    /**
     * 사용자를 등록하는 함수
     * @param {Object} userData - 사용자 데이터 객체
     * @returns {Promise<string>} Firestore에 사용자를 추가한 후 생성된 문서 ID 반환
     */
    // 유저 등록 함수 내에 logEvent 추가
    const registerUser = async (userData) => {
            try {
                const docRef = await addDoc(collection(db, "user"), {
                    nickname: userData.nickname,
                    tasteType: tasteTypeMap[userData.tasteTypeStack[0]],
                    tasteTypeStack: userData.tasteTypeStack,
                });
                console.log("Document written with ID: ", docRef.id);

                logEvent(analytics, 'user_signup', {
                    user_id: docRef.id,
                    nickname: userData.nickname,
                });

                return docRef.id;
            } catch (error) {
                console.error("Error adding document: ", error);
                throw new Error("Error registering user");
            }
        };

    /**
     * 입맛 유형 데이터를 Firestore에서 가져오는 함수
     * @param {number} tasteTypeId - 입맛 유형의 ID
     * @returns {Promise<Object>} Firestore에서 가져온 입맛 유형 데이터 객체
     */
    const getTasteTypeData = async (tasteTypeId) => {
        try {
            const tasteTypeRef = doc(db, "tasteType", tasteTypeId.toString());
            const tasteTypeSnap = await getDoc(tasteTypeRef);
            if (tasteTypeSnap.exists()) {
                return tasteTypeSnap.data();
            } else {
                console.error(`No document found for tasteTypeId: ${tasteTypeId}`);
                throw new Error("No such document!");
            }
        } catch (error) {
            console.error("Error getting taste type data: ", error);
            throw new Error("Error getting taste type data");
        }
    };


    /**
     * 두 입맛 유형 간의 궁합 데이터를 Firestore에서 가져오는 함수
     * @param {number} typeA - 첫 번째 입맛 유형
     * @param {number} typeB - 두 번째 입맛 유형
     * @returns {Promise<Object>} Firestore에서 가져온 궁합 데이터 객체
     */
    const getMatchData = async (typeA, typeB) => {
        try {
            // typeA와 typeB의 조합을 찾는 쿼리
            const matchQuery = query(
                collection(db, "Match"),
                where("typeA", "==", typeA),
                where("typeB", "==", typeB)
            );

            const querySnapshot = await getDocs(matchQuery);
            if (!querySnapshot.empty) {
                return querySnapshot.docs[0].data();
            }

            // typeB와 typeA의 조합을 찾는 쿼리
            const reverseMatchQuery = query(
                collection(db, "Match"),
                where("typeA", "==", typeB),
                where("typeB", "==", typeA)
            );

            const reverseQuerySnapshot = await getDocs(reverseMatchQuery);
            if (!reverseQuerySnapshot.empty) {
                return reverseQuerySnapshot.docs[0].data();
            }

            throw new Error("No such match document!");
        } catch (error) {
            console.error("Error getting match data: ", error);
            throw new Error("Error getting match data");
        }
    };


    /**
     * 사용자의 tasteTypeStack을 Firestore에서 업데이트하는 함수
     * @param {string} userId - 유저의 ID
     * @param {Array<number>} updatedTasteTypeStack - 업데이트된 tasteTypeStack 배열
     * @returns {Promise<void>} Firestore에서 업데이트 작업이 완료되면 resolve되는 프로미스
     */
    const updateUserTasteTypeStack = async (userId, updatedTasteTypeStack) => {
        try {
            const userRef = doc(db, "user", userId);
            await updateDoc(userRef, {tasteTypeStack: updatedTasteTypeStack});
        } catch (error) {
            console.error("Error updating user tasteTypeStack: ", error);
            throw new Error("Error updating user tasteTypeStack");
        }
    };


    /**
     * 사용자의 tasteType을 Firestore에서 업데이트하는 함수
     * @param {string} userId - 유저의 ID
     * @param {number} tasteType - 업데이트할 tasteType 값
     * @returns {Promise<void>} Firestore에서 업데이트 작업이 완료되면 resolve되는 프로미스
     */
    const updateUserTasteType = async (userId, tasteType) => {
        try {
            const userRef = doc(db, "user", userId);
            await updateDoc(userRef, {tasteType});
        } catch (error) {
            console.error("Error updating user tasteType: ", error);
            throw new Error("Error updating user tasteType");
        }
    };

    /**
     * 유저 정보를 Firestore에서 가져오는 함수
     * @param {string} userId - 유저의 ID
     * @returns {Promise<Object>} Firestore에서 가져온 유저 데이터 객체
     */
    const getUserData = async (userId) => {
        try {
            const userRef = doc(db, "user", userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                return userSnap.data();
            } else {
                throw new Error("No such document!");
            }
        } catch (error) {
            console.error("Error getting user data: ", error);
            throw new Error("Error getting user data");
        }
    };


    // 공유 횟수 업데이트 함수
    const incrementShareCount = async () => {
        const shareDocRef = doc(db, 'sharedLinks', 'shareCount'); // 문서 ID를 'shareCount'로 설정

        try {
            const shareDoc = await getDoc(shareDocRef);
            if (shareDoc.exists()) {
                await updateDoc(shareDocRef, {
                    totalShares: shareDoc.data().totalShares + 1
                });
            } else {
                await setDoc(shareDocRef, {
                    totalShares: 1
                });
            }
        } catch (error) {
            console.error("Error updating share count: ", error);
        }
    };

    // 유저 삭제 함수
    const deleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, 'user', userId));
        } catch (error) {
            console.error("Failed to delete user:", error);
            throw new Error("Failed to delete user");
        }
    };


    export {
        registerUser,
        getTasteTypeData,
        getMatchData,
        updateUserTasteTypeStack,
        updateUserTasteType,
        getUserData,
        incrementShareCount,
        deleteUser
    };
