document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const container = document.querySelector(".container");
    const message = document.querySelector(".message");
    const stopwatch = document.querySelector(".stopwatch");

    const popup = document.querySelector(".popup");
    const clearTimeElement = document.getElementById("clear-time");
    const shareTwitterButton = document.getElementById("share-twitter");
    const copyClipboardButton = document.getElementById("copy-to-clipboard");
    const closePopupButton = document.getElementById("close-popup");

    let currentNumber = 1; // 次にクリックするべき番号
    const maxNumber = boxes.length;

    let startTime = null;
    let timerInterval = null;

    // 効果音の準備
    const clickSound = new Audio("sounds/click.mp3");
    const successSound = new Audio("sounds/success.mp3");
    const gameOverSound = new Audio("sounds/gameover.mp3");

    // コンテナのサイズを取得
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // ランダムな位置に移動する関数
    function moveBoxRandomly(box) {
        const randomX = Math.random() * (containerWidth - 50);
        const randomY = Math.random() * (containerHeight - 50);

        box.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    // 各boxを一定時間ごとにランダムな位置に移動
    boxes.forEach(box => {
        setInterval(() => {
            moveBoxRandomly(box);
        }, 1000);
    });

    // ストップウォッチの開始
    function startStopwatch() {
        startTime = performance.now();
        timerInterval = setInterval(() => {
            const elapsed = (performance.now() - startTime) / 1000;
            stopwatch.textContent = `${elapsed.toFixed(2)}s`;
        }, 10);
    }

    // ストップウォッチの停止
    function stopStopwatch() {
        clearInterval(timerInterval);
    }

    // ポップアップの表示
    function showPopup(clearTime) {
        clearTimeElement.textContent = clearTime.toFixed(2);
        popup.classList.remove("hidden");
    }

    // boxをクリックしたときの処理
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            if (!startTime) {
                startStopwatch();
            }

            const boxNumber = parseInt(box.textContent, 10);

            clickSound.currentTime = 0;
            clickSound.play();

            if (boxNumber === currentNumber) {
                currentNumber++;
                box.style.display = "none";

                if (currentNumber > maxNumber) {
                    stopStopwatch();
                    const clearTime = (performance.now() - startTime) / 1000;
                    message.textContent = "CLEAR!";
                    message.style.color = "green";
                    successSound.play();
                    showPopup(clearTime);
                }
            } else {
                message.textContent = "GAMEOVER!";
                message.style.color = "red";
                gameOverSound.play();
                stopStopwatch();

                boxes.forEach(box => {
                    box.style.pointerEvents = "none";
                });
            }
        });
    });

    // Twitterシェアボタンのクリック処理
    shareTwitterButton.addEventListener("click", () => {
        const clearTime = clearTimeElement.textContent;
        const url = encodeURIComponent("https://yourgameurl.com");
        const text = encodeURIComponent(`クリアタイム: ${clearTime}秒! あなたも挑戦してみてね!`);
        const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        window.open(twitterUrl, "_blank");
    });

    // クリップボードコピー処理
    copyClipboardButton.addEventListener("click", () => {
        const clearTime = clearTimeElement.textContent;
        const url = "https://yourgameurl.com";
        const text = `クリアタイム: ${clearTime}秒! あなたも挑戦してみてね! ${url}`;
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("クリアタイムをクリップボードにコピーしました!");
            })
            .catch(() => {
                alert("コピーに失敗しました。");
            });
    });

    // ポップアップを閉じるボタン
    closePopupButton.addEventListener("click", () => {
        popup.classList.add("hidden");
    });
});
