# ToDoアプリ設計書

## 1. アーキテクチャ設計

### 1.1 全体構成
```
src/
├── components/          # UIコンポーネント
│   ├── ui/             # shadcn/uiコンポーネント
│   ├── TodoItem.tsx    # ToDoアイテムコンポーネント
│   ├── TodoList.tsx    # ToDoリストコンポーネント
│   ├── AddTodoForm.tsx # ToDo追加フォーム
│   └── Header.tsx      # ヘッダーコンポーネント
├── hooks/              # カスタムフック
│   ├── useTodos.ts     # ToDo管理フック
│   └── useLocalStorage.ts # ローカルストレージフック
├── types/              # 型定義
│   └── todo.ts         # ToDo関連の型
├── utils/              # ユーティリティ関数
│   └── storage.ts      # ストレージ関連
├── App.tsx             # メインコンポーネント
└── main.tsx           # エントリーポイント
```

### 1.2 データモデル

```typescript
// types/todo.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 将来的な拡張
export interface TodoExtended extends Todo {
  description?: string;
  categoryId?: string;
  priority?: 'high' | 'medium' | 'low';
  dueDate?: Date;
  tags?: string[];
}
```

## 2. コンポーネント設計

### 2.1 App.tsx
**責務**: アプリケーション全体の状態管理とレイアウト
```typescript
- ToDoの状態管理（useTodos フック使用）
- ヘッダー、リスト、追加フォームの配置
- テーマ管理（ダークモード）
```

### 2.2 TodoList.tsx
**責務**: ToDoアイテムのリスト表示
```typescript
Props:
- todos: Todo[]
- onToggle: (id: string) => void
- onDelete: (id: string) => void

機能:
- ToDoアイテムのマッピング
- アニメーション制御
- 空状態の表示
```

### 2.3 TodoItem.tsx
**責務**: 個別のToDoアイテムの表示と操作
```typescript
Props:
- todo: Todo
- onToggle: () => void
- onDelete: () => void

機能:
- チェックボックスの表示/操作
- スワイプ削除（将来実装）
- タップアニメーション
```

### 2.4 AddTodoForm.tsx
**責務**: 新規ToDo追加のUI
```typescript
Props:
- onAdd: (title: string) => void

機能:
- テキスト入力
- バリデーション
- エンターキーでの送信
- モバイルキーボード対応
```

## 3. 状態管理設計

### 3.1 useTodos カスタムフック
```typescript
export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
};
```

### 3.2 useLocalStorage カスタムフック
```typescript
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // ローカルストレージからの読み込み
  // 値の更新時の自動保存
  // エラーハンドリング
};
```

## 4. UI/UXデザイン

### 4.1 カラーパレット
```css
/* ライトモード */
--background: #ffffff;
--foreground: #0a0a0a;
--primary: #3b82f6;
--secondary: #f3f4f6;
--accent: #10b981;
--destructive: #ef4444;

/* ダークモード */
--background: #0a0a0a;
--foreground: #fafafa;
--primary: #60a5fa;
--secondary: #1f2937;
--accent: #34d399;
--destructive: #f87171;
```

### 4.2 レイアウト仕様
- ヘッダー高さ: 56px（固定）
- リストアイテム高さ: 64px（最小）
- パディング: 16px（標準）
- FABサイズ: 56px
- FAB位置: 右下から24px

### 4.3 アニメーション
- リストアイテム追加: fadeIn + slideDown (300ms)
- 削除: fadeOut + slideLeft (200ms)
- チェックボックス: scale + rotate (200ms)
- FAB: scale + rotate (300ms)

## 5. パフォーマンス最適化

### 5.1 レンダリング最適化
- React.memo によるコンポーネントのメモ化
- useMemo/useCallback の適切な使用
- 仮想スクロール（100件以上で実装）

### 5.2 ストレージ最適化
- デバウンスによる保存頻度の制御
- データ圧縮（将来実装）
- 古いデータの自動クリーンアップ

## 6. エラーハンドリング

### 6.1 ローカルストレージエラー
- 容量超過時の警告表示
- 破損データの自動修復
- フォールバック動作

### 6.2 ユーザー入力エラー
- 空文字列の拒否
- 文字数制限（100文字）
- 特殊文字のサニタイズ

## 7. テスト戦略

### 7.1 単体テスト
- カスタムフックのテスト
- ユーティリティ関数のテスト
- コンポーネントの動作テスト

### 7.2 統合テスト
- ToDo追加/削除/更新フロー
- ローカルストレージ連携
- エラーケースの確認

### 7.3 E2Eテスト（将来実装）
- 実際のユーザーフローのテスト
- モバイルデバイスでの動作確認