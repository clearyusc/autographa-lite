import { computed, observable } from "mobx"
const session =  require('electron').remote.session
class Todo {

  constructor(bookId, chapterId, bookContent) {
    this.bookId = bookId
    this.chapterId = chapterId
    this.bookContent = bookContent
  }
}

export class TodoStore {
  @observable bookId = '1'
  @observable chapterId = '1'

  
  // console.log("test")
  // session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, bookCookie) => {
  //   if(bookCookie.length > 0){
  //     // @observable.bookId = bookCookie[0].value;

  //   }    
  // })
  
  getBookAndChapter(){
    _this = this;
    session.defaultSession.cookies.get({ url: 'http://book.autographa.com' }, (error, bookCookie) => {
      if(bookCookie.length > 0){
        _this.bookId = bookCookie[0].value;
        console.log(bookCookie[0].value)
        // @observable.bookId = bookCookie[0].value;
        // new Todo(bookCookie[0].value, '1', '1cc');
      }    else{
        // new Todo('1', '1','');
      }
    })
  }
  // @observable todos = []
  // @observable filter = ""
  // @computed get filteredTodos() {
  //   var matchesFilter = new RegExp(this.filter, "i")
  //   return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  // }

  // createTodo(value) {
  //   this.todos.push(new Todo(value))
  // }

  // clearComplete = () => {
  //   const incompleteTodos = this.todos.filter(todo => !todo.complete)
  //   this.todos.replace(incompleteTodos)
  // }
}

export default new TodoStore

