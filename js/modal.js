/**
 * modal.js - モーダル操作機能
 * モーダルダイアログの表示・非表示制御
 */
document.addEventListener("DOMContentLoaded", function () {
  // モーダル関連の機能を初期化
  initModals();

  function initModals() {
    // モーダルを開く
    document.querySelectorAll("[data-modal-target]").forEach((button) => {
      button.addEventListener("click", function () {
        const modalId = this.getAttribute("data-modal-target");
        openModal(modalId);
      });
    });

    // モーダルを閉じるボタン
    document
      .querySelectorAll(".modal-close, [data-dismiss='modal']")
      .forEach((button) => {
        button.addEventListener("click", function () {
          const modal = this.closest(".modal");
          closeModal(modal);
        });
      });

    // モーダル外クリックで閉じる
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          closeModal(this);
        }
      });
    });
  }

  // モーダル表示
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("show");
      document.body.style.overflow = "hidden"; // スクロール防止
    }
  };

  // モーダルを閉じる
  window.closeModal = function (modal) {
    if (typeof modal === "string") {
      modal = document.getElementById(modal);
    }
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = ""; // スクロール復活
    }
  };

  // 編集モーダルを開く（ユーザー権限用）
  window.openEditModal = function (userInitials) {
    const modal = document.getElementById("editPermissionModal");
    const userAvatar = document.getElementById("modal-user-avatar");

    if (userAvatar) {
      userAvatar.textContent = userInitials;
    }

    // 実際のアプリケーションではここでユーザー情報をロードする
    openModal("editPermissionModal");
  };

  // フォルダ権限モーダル
  window.openFolderPermissions = function (folderName) {
    const modal = document.getElementById("folderPermissionModal");
    const folderNameElement = document.getElementById("modal-folder-name");

    if (folderNameElement) {
      folderNameElement.textContent = folderName;
    }

    // 実際のアプリケーションではここでフォルダ権限情報をロードする
    openModal("folderPermissionModal");
  };
});
