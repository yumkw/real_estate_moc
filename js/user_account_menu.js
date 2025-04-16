/**
 * ユーザー管理画面のJavaScriptコード
 * タブ切り替えとモーダル表示の機能を提供
 */

// ページが読み込まれたら初期化処理を実行
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM読み込み完了");

  // 現在のページでユーザー管理タブがすぐに表示されるように静的コンテンツを用意
  setupDefaultContent();

  // タブクリックイベントリスナーの設定
  const tabItems = document.querySelectorAll(".tab-item");
  tabItems.forEach((tab) => {
    tab.addEventListener("click", function () {
      // アクティブタブのクラス変更
      tabItems.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // タブコンテンツを直接切り替え
      const tabId = this.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // 新規ユーザー追加ボタンのイベントリスナー
  const addUserBtn = document.getElementById("btnAddUser");
  if (addUserBtn) {
    addUserBtn.addEventListener("click", function () {
      showSimpleModal();
    });
  }
});

/**
 * 初期コンテンツをセットアップする
 */
function setupDefaultContent() {
  const tabContent = document.getElementById("tab-content");
  const loadingIndicator = document.getElementById("loading");

  if (loadingIndicator) {
    loadingIndicator.style.display = "none";
  }

  if (tabContent) {
    // ユーザー一覧タブのコンテンツを直接表示
    tabContent.innerHTML = `
<!-- ユーザー一覧タブ -->
<div class="tab-content" id="users-list-content">
  <div class="user-search">
    <div class="search-box">
      <i class="fas fa-search search-icon"></i>
      <input type="text" class="form-control" placeholder="ユーザー名、メール、ロールで検索...">
    </div>
    <select class="form-control" style="width: 150px;">
      <option>すべてのステータス</option>
      <option>アクティブ</option>
      <option>非アクティブ</option>
      <option>承認待ち</option>
      <option>ロック中</option>
    </select>
    <select class="form-control" style="width: 150px;">
      <option>すべてのロール</option>
      <option>管理者</option>
      <option>マネージャー</option>
      <option>スタッフ</option>
      <option>ゲスト</option>
    </select>
  </div>
  
  <div class="user-actions">
    <button class="btn btn-sm btn-outline">
      <i class="fas fa-envelope mr-1"></i> 選択したユーザーに招待メール送信
    </button>
    <button class="btn btn-sm btn-outline">
      <i class="fas fa-lock mr-1"></i> ロック
    </button>
    <button class="btn btn-sm btn-outline">
      <i class="fas fa-trash-alt mr-1"></i> 削除
    </button>
    
    <div class="ml-auto">
      <button class="btn btn-sm btn-outline">
        <i class="fas fa-download mr-1"></i> エクスポート
      </button>
    </div>
  </div>
  
  <div class="user-table">
    <table class="table table-hover">
      <thead>
        <tr>
          <th style="width: 50px;" class="text-center">
            <input type="checkbox">
          </th>
          <th>ユーザー</th>
          <th>ロール</th>
          <th>最終ログイン</th>
          <th>ステータス</th>
          <th>アクセス権限</th>
          <th style="width: 150px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">
            <input type="checkbox">
          </td>
          <td>
            <div class="user-details">
              <div class="user-avatar">TA</div>
              <div>
                <div class="user-name">田中 明彦</div>
                <div class="user-email">tanaka.a@example.com</div>
              </div>
            </div>
          </td>
          <td>
            <span class="role-admin">管理者</span>
          </td>
          <td>
            <div class="user-last-activity">2025/04/12 09:45</div>
          </td>
          <td>
            <div class="status-active">
              <i class="fas fa-circle mr-1"></i> アクティブ
            </div>
          </td>
          <td>
            <span class="badge badge-light">すべてのプロジェクト</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-key"></i>
            </button>
            <button class="btn btn-sm btn-outline">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <input type="checkbox">
          </td>
          <td>
            <div class="user-details">
              <div class="user-avatar">SY</div>
              <div>
                <div class="user-name">鈴木 優子</div>
                <div class="user-email">suzuki.y@example.com</div>
              </div>
            </div>
          </td>
          <td>
            <span class="role-manager">マネージャー</span>
          </td>
          <td>
            <div class="user-last-activity">2025/04/10 16:32</div>
          </td>
          <td>
            <div class="status-active">
              <i class="fas fa-circle mr-1"></i> アクティブ
            </div>
          </td>
          <td>
            <span class="badge badge-light">5 プロジェクト</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-key"></i>
            </button>
            <button class="btn btn-sm btn-outline">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <input type="checkbox">
          </td>
          <td>
            <div class="user-details">
              <div class="user-avatar">KT</div>
              <div>
                <div class="user-name">加藤 拓也</div>
                <div class="user-email">kato.t@example.com</div>
              </div>
            </div>
          </td>
          <td>
            <span class="role-staff">スタッフ</span>
          </td>
          <td>
            <div class="user-last-activity">2025/04/11 11:23</div>
          </td>
          <td>
            <div class="status-active">
              <i class="fas fa-circle mr-1"></i> アクティブ
            </div>
          </td>
          <td>
            <span class="badge badge-light">3 プロジェクト</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-key"></i>
            </button>
            <button class="btn btn-sm btn-outline">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <input type="checkbox">
          </td>
          <td>
            <div class="user-details">
              <div class="user-avatar">MS</div>
              <div>
                <div class="user-name">村田 さくら</div>
                <div class="user-email">murata.s@example.com</div>
              </div>
            </div>
          </td>
          <td>
            <span class="role-staff">スタッフ</span>
          </td>
          <td>
            <div class="user-last-activity">2025/04/09 14:17</div>
          </td>
          <td>
            <div class="status-locked">
              <i class="fas fa-lock mr-1"></i> ロック中
            </div>
          </td>
          <td>
            <span class="badge badge-light">2 プロジェクト</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-unlock"></i>
            </button>
            <button class="btn btn-sm btn-outline">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <input type="checkbox">
          </td>
          <td>
            <div class="user-details">
              <div class="user-avatar">YN</div>
              <div>
                <div class="user-name">山本 直樹</div>
                <div class="user-email">yamamoto.n@example.com</div>
              </div>
            </div>
          </td>
          <td>
            <span class="role-guest">ゲスト</span>
          </td>
          <td>
            <div class="user-last-activity">未ログイン</div>
          </td>
          <td>
            <div class="status-pending">
              <i class="fas fa-clock mr-1"></i> 承認待ち
            </div>
          </td>
          <td>
            <span class="badge badge-light">1 プロジェクト</span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline mr-1">
              <i class="fas fa-envelope"></i>
            </button>
            <button class="btn btn-sm btn-outline">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="d-flex justify-content-between align-items-center mt-4">
    <div class="text-muted">全 36 件中 1-5 件を表示</div>
    <ul class="pagination">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">前へ</a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">次へ</a>
      </li>
    </ul>
  </div>
</div>
    `;

    // ユーザー一覧の初期化
    initializeUsersListTab();
  }
}

/**
 * タブを切り替える
 * @param {string} tabId - 表示するタブのID
 */
function switchTab(tabId) {
  const tabContent = document.getElementById("tab-content");

  if (!tabContent) return;

  console.log(`タブ切り替え: ${tabId}`);

  // ローディング表示
  tabContent.innerHTML = "";
  const loadingIndicator = document.getElementById("loading");
  if (loadingIndicator) {
    loadingIndicator.style.display = "block";
  }

  // タイムアウトを使って非同期読み込みをシミュレート
  setTimeout(() => {
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }

    // 新しいタブコンテンツを表示
    switch (tabId) {
      case "users-list":
        setupDefaultContent(); // ユーザー一覧タブ
        break;
      case "permissions":
        showPermissionsTab(tabContent);
        break;
      case "security":
        showSecurityTab(tabContent);
        break;
      case "access-log":
        showAccessLogTab(tabContent);
        break;
    }
  }, 300); // 300ミリ秒のローディング表示
}

/**
 * 権限設定タブを表示
 */
function showPermissionsTab(container) {
  container.innerHTML = `
<!-- 権限設定タブ -->
<div class="tab-content" id="permissions-content">
  <div class="mb-4">
    <p>各ロールの権限を設定します。権限の変更はすぐに反映され、該当するロールのすべてのユーザーに適用されます。</p>
  </div>
  
  <div class="permission-table mb-4">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>機能・アクション</th>
          <th>管理者</th>
          <th>マネージャー</th>
          <th>スタッフ</th>
          <th>ゲスト</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="permission-module">ユーザー管理</div>
            <div class="permission-description">ユーザーの追加、編集、削除、招待</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">権限設定</div>
            <div class="permission-description">ロールと権限の管理</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">プロジェクト管理</div>
            <div class="permission-description">プロジェクトの作成、編集、削除</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">書類アップロード</div>
            <div class="permission-description">ファイルのアップロードと基本的な管理</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">書類削除</div>
            <div class="permission-description">アップロード済みファイルの削除</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-minus-circle permission-partial"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">メタデータ編集</div>
            <div class="permission-description">ファイル名、タグ、フォルダなどの編集</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">分類ルール設定</div>
            <div class="permission-description">自動分類ルールの作成と編集</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">書類閲覧</div>
            <div class="permission-description">アップロード済みファイルの閲覧</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">書類ダウンロード</div>
            <div class="permission-description">ファイルのダウンロード</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-minus-circle permission-partial"></i></td>
        </tr>
        <tr>
          <td>
            <div class="permission-module">監査ログの閲覧</div>
            <div class="permission-description">システムログとユーザーアクティビティの閲覧</div>
          </td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-check permission-check"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
          <td><i class="fas fa-ban permission-x"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="d-flex justify-content-end">
    <button class="btn btn-primary permission-save-btn">
      <i class="fas fa-save mr-1"></i> 権限設定を保存
    </button>
  </div>
</div>
  `;

  // ボタンにイベントリスナーを追加
  const saveButton = container.querySelector(".permission-save-btn");
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      alert("権限設定が保存されました。");
    });
  }
}

/**
 * セキュリティ設定タブを表示
 */
function showSecurityTab(container) {
  container.innerHTML = `
<!-- セキュリティ設定タブ -->
<div class="tab-content" id="security-content">
  <div class="security-section">
    <h3 class="mb-3">パスワードポリシー</h3>
    
    <div class="security-item">
      <div class="security-item-header">
        <div class="security-item-title">
          <i class="fas fa-lock"></i>
          パスワード複雑性の要件
        </div>
        <div class="security-item-status enabled">有効</div>
      </div>
      <div class="security-item-description">
        パスワードには以下の条件を含める必要があります：
      </div>
      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="pwd-length" checked>
          <label class="custom-control-label" for="pwd-length">8文字以上の長さ</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="pwd-uppercase" checked>
          <label class="custom-control-label" for="pwd-uppercase">大文字を含む</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="pwd-lowercase" checked>
          <label class="custom-control-label" for="pwd-lowercase">小文字を含む</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="pwd-number" checked>
          <label class="custom-control-label" for="pwd-number">数字を含む</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="pwd-special">
          <label class="custom-control-label" for="pwd-special">特殊文字を含む（!@#$%^&*）</label>
        </div>
      </div>
    </div>
    
    <!-- 他のセキュリティ設定項目は省略 -->
    <div class="security-item">
      <div class="security-item-header">
        <div class="security-item-title">
          <i class="fas fa-history"></i>
          パスワード有効期限ポリシー
        </div>
        <div class="security-item-status enabled">有効</div>
      </div>
      <div class="security-item-description">
        定期的なパスワード変更を要求します。
      </div>
      <div class="form-group">
        <label>パスワードの有効期限</label>
        <select class="form-control">
          <option>30日</option>
          <option selected>90日</option>
          <option>180日</option>
          <option>365日</option>
          <option>無期限</option>
        </select>
      </div>
    </div>
  </div>
  
  <div class="d-flex justify-content-end mt-4">
    <button class="btn btn-secondary mr-2 security-reset-btn">キャンセル</button>
    <button class="btn btn-primary security-save-btn">
      <i class="fas fa-save mr-1"></i> 設定を保存
    </button>
  </div>
</div>
  `;

  // ボタンにイベントリスナーを追加
  const saveButton = container.querySelector(".security-save-btn");
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      alert("セキュリティ設定が保存されました。");
    });
  }

  const resetButton = container.querySelector(".security-reset-btn");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      if (confirm("セキュリティ設定をリセットしますか？")) {
        alert("セキュリティ設定がリセットされました。");
      }
    });
  }
}

/**
 * アクセスログタブを表示
 */
function showAccessLogTab(container) {
  container.innerHTML = `
<!-- アクセスログタブ -->
<div class="tab-content" id="access-log-content">
  <div class="activity-log-filters">
    <div class="activity-log-filter active">すべて</div>
    <div class="activity-log-filter"><i class="fas fa-sign-in-alt"></i> ログイン</div>
    <div class="activity-log-filter"><i class="fas fa-file-upload"></i> ファイル操作</div>
    <div class="activity-log-filter"><i class="fas fa-user-cog"></i> ユーザー管理</div>
    <div class="activity-log-filter"><i class="fas fa-shield-alt"></i> セキュリティ</div>
    <div class="activity-log-filter"><i class="fas fa-exclamation-triangle"></i> 警告</div>
  </div>
  
  <div class="activity-log-date-range">
    <label>期間：</label>
    <input type="date" class="form-control" value="2025-04-01">
    <span>～</span>
    <input type="date" class="form-control" value="2025-04-15">
    <button class="btn btn-outline ml-2 log-search-btn">
      <i class="fas fa-search mr-1"></i> 検索
    </button>
    <button class="btn btn-outline ml-1">
      <i class="fas fa-filter mr-1"></i> 詳細フィルタ
    </button>
  </div>
  
  <div class="card">
    <div class="card-body p-0">
      <div class="activity-log-item">
        <div class="activity-log-icon login">
          <i class="fas fa-sign-in-alt"></i>
        </div>
        <div class="activity-log-content">
          <div class="activity-log-message">
            <strong>田中 明彦</strong> がログインしました。
          </div>
          <div class="activity-log-meta">
            <span><i class="far fa-clock"></i> 2025/04/12 09:45</span>
            <span><i class="fas fa-desktop"></i> Windows 11 / Chrome</span>
            <span><i class="fas fa-map-marker-alt"></i> 東京 (192.168.1.1)</span>
          </div>
        </div>
      </div>
      
      <div class="activity-log-item">
        <div class="activity-log-icon upload">
          <i class="fas fa-file-upload"></i>
        </div>
        <div class="activity-log-content">
          <div class="activity-log-message">
            <strong>鈴木 優子</strong> が <strong>グリーンハイツ渋谷</strong> プロジェクトに5つのファイルをアップロードしました。
          </div>
          <div class="activity-log-meta">
            <span><i class="far fa-clock"></i> 2025/04/12 09:30</span>
            <span><i class="fas fa-desktop"></i> macOS / Safari</span>
            <span><i class="fas fa-map-marker-alt"></i> 東京 (192.168.1.24)</span>
          </div>
        </div>
      </div>
      
      <div class="activity-log-item">
        <div class="activity-log-icon edit">
          <i class="fas fa-edit"></i>
        </div>
        <div class="activity-log-content">
          <div class="activity-log-message">
            <strong>田中 明彦</strong> が <strong>グリーンハイツ渋谷</strong> プロジェクトのファイルメタデータを更新しました。
          </div>
          <div class="activity-log-meta">
            <span><i class="far fa-clock"></i> 2025/04/11 17:23</span>
            <span><i class="fas fa-desktop"></i> Windows 11 / Chrome</span>
            <span><i class="fas fa-map-marker-alt"></i> 東京 (192.168.1.1)</span>
          </div>
        </div>
      </div>
      
      <!-- 他のログ項目は省略 -->
    </div>
  </div>
  
  <div class="d-flex justify-content-between align-items-center mt-4">
    <div class="text-muted">全 156 件中 1-6 件を表示</div>
    <ul class="pagination">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">前へ</a>
      </li>
      <li class="page-item active">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">次へ</a>
      </li>
    </ul>
  </div>
</div>
  `;

  // フィルターにイベントリスナーを追加
  const logFilters = container.querySelectorAll(".activity-log-filter");
  logFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      logFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 検索ボタンにイベントリスナーを追加
  const searchButton = container.querySelector(".log-search-btn");
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      // 視覚的フィードバック
      this.classList.add("btn-primary");
      setTimeout(() => this.classList.remove("btn-primary"), 300);
    });
  }
}

/**
 * ユーザー一覧タブの初期化
 */
function initializeUsersListTab() {
  // ユーザー一覧のテーブル行にクリックイベントリスナーを追加
  const userRows = document.querySelectorAll(".user-table tbody tr");
  userRows.forEach((row) => {
    row.addEventListener("click", function (event) {
      // 編集ボタンやチェックボックスのクリックは無視
      if (
        event.target.closest("button") ||
        event.target.closest('input[type="checkbox"]')
      ) {
        return;
      }

      // 行選択の視覚的フィードバック
      userRows.forEach((r) => r.classList.remove("bg-light"));
      this.classList.add("bg-light");
    });
  });

  // 編集ボタンにイベントリスナーを追加
  const editButtons = document.querySelectorAll(".user-table .btn-outline");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      showSimpleModal();
    });
  });
}

// 以下の関数は変更なし
/**
 * 簡易モーダルを表示
 */
function showSimpleModal() {
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return;

  // モーダルコンテナを表示
  modalContainer.style.display = "block";

  // モーダルHTMLを直接挿入
  modalContainer.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h2>新規ユーザー追加</h2>
          <button class="btn btn-sm" id="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>名前</label>
            <input type="text" class="form-control" placeholder="例: 山田 太郎">
          </div>
          <div class="form-group">
            <label>メールアドレス</label>
            <input type="email" class="form-control" placeholder="例: yamada@example.com">
          </div>
          <div class="form-group">
            <label>ロール</label>
            <div class="role-options">
              <div class="role-option">
                <input type="radio" name="role" id="role-admin">
                <label for="role-admin">管理者</label>
              </div>
              <div class="role-option active">
                <input type="radio" name="role" id="role-editor" checked>
                <label for="role-editor">編集者</label>
              </div>
              <div class="role-option">
                <input type="radio" name="role" id="role-viewer">
                <label for="role-viewer">閲覧者</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="cancelAddUser">キャンセル</button>
          <button class="btn btn-primary">
            <i class="fas fa-user-plus mr-1"></i> ユーザーを追加
          </button>
        </div>
      </div>
    </div>
  `;

  // モーダル閉じるボタンにイベントリスナーを追加
  const closeButton = document.getElementById("closeModal");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closeModal();
    });
  }

  // キャンセルボタンにイベントリスナーを追加
  const cancelButton = document.getElementById("cancelAddUser");
  if (cancelButton) {
    cancelButton.addEventListener("click", function () {
      closeModal();
    });
  }

  // ロールオプションの切り替え
  const roleOptions = modalContainer.querySelectorAll(".role-option");
  roleOptions.forEach((option) => {
    option.addEventListener("click", function () {
      roleOptions.forEach((o) => o.classList.remove("active"));
      this.classList.add("active");
      const radio = this.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}

/**
 * モーダルを閉じる
 */
function closeModal() {
  const modalContainer = document.getElementById("modal-container");
  if (modalContainer) {
    modalContainer.style.display = "none";
    modalContainer.innerHTML = "";
  }
}

// グローバルスコープで関数を利用可能に
window.closeModal = closeModal;
window.switchTab = switchTab;
