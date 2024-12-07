document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const container = document.querySelector(".container");
    const message = document.querySelector(".message");

    let currentNumber = 1; // 次にクリックするべき番号
    const maxNumber = boxes.length;

    // コンテナのサイズを取得
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // ランダムな位置に移動する関数
    function moveBoxRandomly(box) {
        const randomX = Math.random() * (containerWidth - 50); // boxの幅を引く
        const randomY = Math.random() * (containerHeight - 50); // boxの高さを引く

        box.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    // 各boxを一定時間ごとにランダムな位置に移動
    boxes.forEach(box => {
        setInterval(() => {
            moveBoxRandomly(box);
        }, 1000); // 1秒ごとに移動
    });

    // boxをクリックしたときの処理
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            const boxNumber = parseInt(box.textContent, 10); // ボックスの番号を取得

            if (boxNumber === currentNumber) {
                // 正しい順序でクリック
                currentNumber++;
                box.style.display = "none"; // ボックスを非表示にする

                if (currentNumber > maxNumber) {
                    // 全てのボックスを正しい順序でクリックした場合
                    message.textContent = "CLEAR!";
                    message.style.color = "green";
                }
            } else {
                // 間違った順序でクリック
                message.textContent = "GAMEOVER!";
                message.style.color = "red";

                // すべてのボックスを動かなくする（ゲーム終了）
                boxes.forEach(box => {
                    box.style.pointerEvents = "none";
                });
            }
        });
    });
});
