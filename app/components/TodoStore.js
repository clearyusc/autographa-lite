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
  @observable bookChapter = {bookId: 0, chapterLength: 0}
  @observable activeTabe = 1
  @observable showModalBooks = false
  @observable bookChapterContent = ''

  
  
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
}

export default new TodoStore

