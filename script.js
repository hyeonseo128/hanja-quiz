const words = [
    { id: 1, text: "일백 백", image: "1.png" },
    { id: 2, text: "필 발", image: "2.png" },
    { id: 3, text: "아홉 구", image: "3.png" },
    { id: 4, text: "소 우", image: "4.png" },
    { id: 5, text: "하나 일", image: "5.png" },
    { id: 6, text: "털 모", image: "6.png" },
    { id: 7, text: "돌 석", image: "7.png" },
    { id: 8, text: "일곱 칠", image: "8.png" },
    { id: 9, text: "넘어질 전", image: "9.png" },
    { id: 10, text: "여덟 팔", image: "10.png" },
    { id: 11, text: "일어날 기", image: "11.png" },
    { id: 12, text: "일천 천", image: "12.png" },
    { id: 13, text: "쓸 고", image: "13.png" },
    { id: 14, text: "들을 문", image: "14.png" },
    { id: 15, text: "알 지", image: "15.png" },
    { id: 16, text: "과녁 적", image: "16.png" },
    { id: 17, text: "억 억", image: "17.png" },
    { id: 18, text: "조짐 조", image: "18.png" },
    { id: 19, text: "방 방", image: "19.png" },
    { id: 20, text: "넷 사", image: "20.png" },
    { id: 21, text: "벗 사", image: "21.png" },
    { id: 22, text: "지을 작", image: "22.png" },
    { id: 23, text: "셋 삼", image: "23.png" },
    { id: 24, text: "풀 초", image: "24.png" },
    { id: 25, text: "잔 배", image: "25.png" },
    { id: 26, text: "무성할 무", image: "26.png" },
    { id: 27, text: "성할 성", image: "27.png" },
    { id: 28, text: "바늘 침", image: "28.png" },
    { id: 29, text: "나무 수", image: "29.png" },
    { id: 30, text: "나물 채", image: "30.png" },
    { id: 31, text: "먹을 식", image: "31.png" },
    { id: 32, text: "풀 초", image: "32.png" },
    { id: 33, text: "달 감", image: "33.png" },
    { id: 34, text: "될 화", image: "34.png" },
    { id: 35, text: "보리 맥", image: "35.png" },
    { id: 36, text: "밥 반", image: "36.png" },
    { id: 37, text: "가죽 피", image: "37.png" },
    { id: 38, text: "일어날 흥", image: "38.png" },
    { id: 39, text: "뿔 각", image: "39.png" },
    { id: 40, text: "설 립", image: "40.png" },
    { id: 41, text: "성품 성", image: "41.png" },
    { id: 42, text: "다섯 오", image: "42.png" },
    { id: 43, text: "여섯 륙", image: "43.png" }
];

let questionPool = [];
let memorized = [];
let unmemorized = [];
let currentWord = null;
let currentMode = "all";
let currentQuizType = "textToImage";

// 문제 리스트 초기화 및 섞기
function resetQuestions() {
    if (currentMode === "all") {
        questionPool = shuffle([...words]);
    } else if (currentMode === "memorized") {
        questionPool = shuffle([...memorized]);
    } else if (currentMode === "unmemorized") {
        questionPool = shuffle([...unmemorized]);
    }
}

// 학습 모드 변경
document.getElementById("modeSelect").addEventListener("change", (e) => {
    currentMode = e.target.value;
    resetQuestions();
    loadNextQuestion();
});

// 출제 방식 변경
document.getElementById("quizType").addEventListener("change", (e) => {
    currentQuizType = e.target.value;
    loadNextQuestion();
});

// 랜덤 섞기
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 다음 문제 로드
function loadNextQuestion() {
    if (questionPool.length === 0) {
        resetQuestions();
    }

    if (questionPool.length === 0) {
        document.getElementById("question").textContent = "문제가 없습니다.";
        document.getElementById("image").classList.add("hidden");
        return;
    }

    currentWord = questionPool.pop();

    if (currentQuizType === "textToImage") {
        document.getElementById("question").textContent = currentWord.text;
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.add("hidden");
    } else {
        document.getElementById("question").textContent = "";
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.remove("hidden");
    }

    updateProgress();
}

// 진행 상황 업데이트 (현재 문제 번호 포함)
function updateProgress() {
    const totalQuestions = words.length;
    const currentQuestionNumber = totalQuestions - questionPool.length;
    
    document.getElementById("progress").textContent =
        `현재 문제: ${currentQuestionNumber} / ${totalQuestions}  
        | 남은 문제: ${questionPool.length}  
        | 외운 문제: ${memorized.length}  
        | 못 외운 문제: ${unmemorized.length}`;
}


// 정답 보기
document.getElementById("showAnswer").addEventListener("click", () => {
    if (currentQuizType === "textToImage") {
        document.getElementById("image").classList.remove("hidden");
    } else {
        document.getElementById("question").textContent = currentWord.text;
    }
});

// 몰라요
document.getElementById("dontKnow").addEventListener("click", () => {
    if (!unmemorized.includes(currentWord)) {
        unmemorized.push(currentWord);
    }
    loadNextQuestion();
});

// 알아요
document.getElementById("know").addEventListener("click", () => {
    if (!memorized.includes(currentWord)) {
        memorized.push(currentWord);
    }
    loadNextQuestion();
});

// 진행 상황 업데이트
function updateProgress() {
    document.getElementById("progress").textContent = 
        `남은 문제: ${questionPool.length}, 외운 문제: ${memorized.length}, 못 외운 문제: ${unmemorized.length}`;
}

// 초기 문제 설정
resetQuestions();
loadNextQuestion();