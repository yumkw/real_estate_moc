/**
 * tabs.js - タブ操作機能
 * タブ切り替え機能を提供します
 */
document.addEventListener("DOMContentLoaded", function () {
  // 複数のタブグループに対応
  initTabGroups();

  function initTabGroups() {
    // 権限設定用タブ
    initPermissionTabs();

    // その他のタブ初期化を追加
  }

  function initPermissionTabs() {
    const tabUsers = document.getElementById("tab-users");
    const tabFolders = document.getElementById("tab-folders");
    const tabInvites = document.getElementById("tab-invites");

    if (!tabUsers) return; // 該当要素がない場合は終了

    const userPermissions = document.getElementById("user-permissions");
    const folderPermissions = document.getElementById("folder-permissions");
    const invitesManagement = document.getElementById("invites-management");

    tabUsers.addEventListener("click", function (e) {
      e.preventDefault();
      setActiveTab(tabUsers, userPermissions);
    });

    tabFolders.addEventListener("click", function (e) {
      e.preventDefault();
      setActiveTab(tabFolders, folderPermissions);
    });

    tabInvites.addEventListener("click", function (e) {
      e.preventDefault();
      setActiveTab(tabInvites, invitesManagement);
    });
  }

  function setActiveTab(tabElement, contentElement) {
    // タブのアクティブ状態を更新
    const tabItems = tabElement
      .closest(".tab-menu-permissions")
      .querySelectorAll(".tab-item");
    tabItems.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabElement.classList.add("active");

    // コンテンツの表示を切り替え
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach((content) => {
      content.style.display = "none";
    });
    contentElement.style.display = "block";
  }
});
