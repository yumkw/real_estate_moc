/**
 * 不動産書類管理システム - アップロード画面用JavaScriptファイル
 */
document.addEventListener("DOMContentLoaded", function () {
  // タブ切り替え機能
  const tabOptions = document.querySelectorAll(".upload-type-option");
  const tabContents = document.querySelectorAll(".upload-content");

  tabOptions.forEach((tab) => {
    tab.addEventListener("click", function () {
      // アクティブタブのクラスを切り替え
      tabOptions.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // コンテンツの表示/非表示を切り替え
      const targetId = this.getAttribute("data-target");
      tabContents.forEach((content) => {
        content.style.display = "none";
        content.classList.remove("active");
      });

      const activeContent = document.getElementById(targetId);
      activeContent.style.display = "block";
      activeContent.classList.add("active");
    });
  });

  // ドラッグ&ドロップ機能
  const dropzone = document.getElementById("main-dropzone");
  const fileInput = document.getElementById("file-input");
  const browseButton = document.getElementById("browse-files");
  const uploadFilesList = document.getElementById("upload-files-list");
  const uploadQueue = document.getElementById("upload-queue");
  const uploadProgress = document.getElementById("upload-progress");
  const progressItems = document.getElementById("progress-items");
  const uploadComplete = document.getElementById("upload-complete");
  const cancelButton = document.getElementById("cancel-upload");
  const executeButton = document.getElementById("execute-upload");
  const viewResultsButton = document.getElementById("view-results");

  if (browseButton && fileInput) {
    browseButton.addEventListener("click", function () {
      fileInput.click();
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", function (e) {
      handleFiles(e.target.files);
    });
  }

  if (dropzone) {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(
        eventName,
        function () {
          dropzone.classList.add("active");
        },
        false
      );
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(
        eventName,
        function () {
          dropzone.classList.remove("active");
        },
        false
      );
    });

    dropzone.addEventListener(
      "drop",
      function (e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
      },
      false
    );
  }

  // ファイル処理
  function handleFiles(files) {
    if (files.length === 0) return;

    // アップロードリストを表示
    uploadFilesList.style.display = "block";

    // ファイル一覧をクリア
    uploadQueue.innerHTML = "";

    // 各ファイルをリストに追加
    Array.from(files).forEach((file) => {
      const fileItem = createFileItem(file);
      uploadQueue.appendChild(fileItem);
    });
  }

  // ファイル項目を作成
  function createFileItem(file) {
    const fileExt = file.name.split(".").pop().toLowerCase();
    let fileIconClass = "far fa-file";

    // ファイル種類に応じたアイコン
    if (["pdf"].includes(fileExt)) {
      fileIconClass = "far fa-file-pdf";
    } else if (["doc", "docx"].includes(fileExt)) {
      fileIconClass = "far fa-file-word";
    } else if (["xls", "xlsx"].includes(fileExt)) {
      fileIconClass = "far fa-file-excel";
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileExt)) {
      fileIconClass = "far fa-file-image";
    }

    // ファイルサイズをフォーマット
    const fileSize = formatFileSize(file.size);

    const fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.innerHTML = `
      <div class="file-icon">
        <i class="${fileIconClass}"></i>
      </div>
      <div class="file-name">${file.name}</div>
      <div class="file-meta">
        <span class="file-size">${fileSize}</span>
      </div>
      <div class="file-actions">
        <button class="btn btn-sm btn-outline-danger remove-file">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    // 削除ボタンにイベントリスナー追加
    const removeButton = fileItem.querySelector(".remove-file");
    removeButton.addEventListener("click", function () {
      fileItem.remove();

      // もしファイルがなくなったらリストを非表示
      if (uploadQueue.children.length === 0) {
        uploadFilesList.style.display = "none";
      }
    });

    return fileItem;
  }

  // ファイルサイズをわかりやすい形式に変換
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // アップロード実行
  if (executeButton) {
    executeButton.addEventListener("click", function () {
      const fileItems = uploadQueue.querySelectorAll(".file-item");

      if (fileItems.length === 0) {
        alert("アップロードするファイルがありません。");
        return;
      }

      // アップロードリストを非表示
      uploadFilesList.style.display = "none";

      // 進行状況表示
      uploadProgress.style.display = "block";
      progressItems.innerHTML = "";

      // 各ファイルの進行状況を追加
      fileItems.forEach((fileItem, index) => {
        const fileName = fileItem.querySelector(".file-name").textContent;
        const fileSize = fileItem.querySelector(".file-size").textContent;

        const progressItem = document.createElement("div");
        progressItem.className = "upload-progress-item";
        progressItem.innerHTML = `
          <div class="file-info">
            <div class="file-name">${fileName}</div>
            <div class="file-size">${fileSize}</div>
          </div>
          <div class="progress">
            <div class="progress-bar" style="width: 0%"></div>
          </div>
        `;

        progressItems.appendChild(progressItem);

        // 進行をシミュレート
        simulateProgress(progressItem, index);
      });
    });
  }

  // キャンセルボタン
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      uploadFilesList.style.display = "none";
      uploadQueue.innerHTML = "";
    });
  }

  // 結果確認ボタン
  if (viewResultsButton) {
    viewResultsButton.addEventListener("click", function () {
      // ここで結果確認画面へ遷移
      window.location.href = "06_User_notification.html";
    });
  }

  // アップロード進行をシミュレート
  function simulateProgress(progressItem, delay) {
    const progressBar = progressItem.querySelector(".progress-bar");
    let width = 0;

    // 遅延を増やして時間差アップロードを表現
    setTimeout(() => {
      const interval = setInterval(() => {
        if (width >= 100) {
          clearInterval(interval);
          checkAllComplete();
        } else {
          width += Math.floor(Math.random() * 10) + 1;
          if (width > 100) width = 100;
          progressBar.style.width = width + "%";
        }
      }, 200);
    }, delay * 500);
  }

  // すべてのアップロードが完了したか確認
  function checkAllComplete() {
    const progressBars = document.querySelectorAll(".progress-bar");
    let allComplete = true;

    progressBars.forEach((bar) => {
      if (parseInt(bar.style.width) < 100) {
        allComplete = false;
      }
    });

    if (allComplete) {
      uploadComplete.style.display = "block";
    }
  }

  // メール添付関連
  const copyEmailButton = document.getElementById("copy-email");
  if (copyEmailButton) {
    copyEmailButton.addEventListener("click", function () {
      const emailInput = this.parentElement.previousElementSibling;
      emailInput.select();
      document.execCommand("copy");

      // コピー成功を通知
      this.innerHTML = '<i class="fas fa-check"></i> コピー済み';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-copy"></i> コピー';
      }, 2000);
    });
  }

  // プロジェクト選択変更時のメールアドレス更新
  const emailProjectSelect = document.getElementById("email-project-select");
  if (emailProjectSelect) {
    emailProjectSelect.addEventListener("change", function () {
      const projectName = this.value;
      const emailInput = document.querySelector(".input-group input");
      if (emailInput) {
        emailInput.value = `upload.${projectName}@docsystem.example.com`;
      }
    });
  }
});
