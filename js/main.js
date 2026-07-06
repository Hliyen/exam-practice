// 頁面載入完成後，先綁定所有 Checkbox 的手動點擊事件
document.addEventListener("DOMContentLoaded", function() {
    // 找到畫面上所有以 mark_ 開頭的 checkbox
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="mark_"]');
    
    checkboxes.forEach(checkbox => {
        // 當使用者「手動」勾選或取消勾選時，立即更新總數
        checkbox.addEventListener('change', updateWrongCount);
    });
});

// 【核心函數】計算目前有多少個方框被勾選，並更新到頂端欄
function updateWrongCount() {
    // 撈出所有被勾選的 checkbox 數量
    const checkedCount = document.querySelectorAll('input[type="checkbox"][id^="mark_"]:checked').length;
    
    // 更新到網頁頂端的數字中
    document.getElementById('wrong-count').innerText = checkedCount;
}

// 修改原本的 checkAnswer 函數
function checkAnswer(buttonElement, userChoice, correctChoice, questionId) {
    const isClicked = buttonElement.getAttribute('data-clicked') === 'true';
    const checkbox = document.getElementById(`mark_${questionId}`);

    if (isClicked) {
        // 【狀態回復】
        buttonElement.style.backgroundColor = "#ffffff";
        buttonElement.style.borderColor = "#cbd5e1";
        buttonElement.style.color = "#475569";
        buttonElement.removeAttribute('data-clicked');
    } else {
        // 【執行檢查】
        if (userChoice === correctChoice) {
            buttonElement.style.backgroundColor = "#e2f0d9";
            buttonElement.style.borderColor = "#385723";
            buttonElement.style.color = "#385723";
        } else {
            buttonElement.style.backgroundColor = "#fce4d6";
            buttonElement.style.borderColor = "#c65911";
            buttonElement.style.color = "#c65911";
            
            // 自動勾選旁邊的「標記」小方框
            if (checkbox) {
                checkbox.checked = true;
                // ⚠️ 關鍵：因為是程式自動勾選的，必須手動觸發計算更新
                updateWrongCount();
            }
        }
        buttonElement.setAttribute('data-clicked', 'true');
    }
}
