// ここがトップページだよ
// ↓まずインポートする｛｝で囲ってあるのコンポーネント使います宣言
// スタイルシートはこれ使います宣言
import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js"


// 多分クラスコンポーネントじゃなくて関数でかけるけどとりえず
class App extends Component {

  // ToDoListをstateに定義、初期値は []
  state = {
    todoList: []
  }
// クラスコンポーネントはレンダーがいるよ
  render() {
    return (
      <div className="App">
        <form
          className="App-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"]
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];

            // todoList stateに追加
            this.setState(
              {
                todoList: this.state.todoList.concat({
                  title: titleElement.value,
                  description: descriptionElement.value
                })
              },
              // stateの変更後に入力した値を空にする
              () => {
                titleElement.value = "";
                descriptionElement.value = "";
              }
            )
          }}
        >
          <div>
            <input
              id="title"
              placeholder="タイトル"
            />
            <textarea
              id="description"
              placeholder="内容"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              登録する
            </button>
          </div>
        </form>

        <div>
        {/* todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
          {this.state.todoList.map(todo => (
            <ToDoListItem
              key={todo.title}
              title={todo.title}
              description={todo.description}
              // クリックされたItemをtodoList stateから削除
              onClick={() => {
                this.setState({
                  todoList: this.state.todoList.filter(x => x !== todo)
                })
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;