import { computed, observable } from "mobx"
const session =  require('electron').remote.session
const Constant = require("../util/constants");

export class TodoStore {
  @observable bookId = '1'
  @observable chapterId = '1'
  @observable refId = 'eng_ulb'
  @observable bookChapter = { bookId: 0, chapterLength: 0 }
  @observable activeTab = 1
  @observable showModalBooks = false
  @observable showModalSettings = false
  @observable showModalAboutUs = false
  @observable bookChapterContent = ''
  @observable chunkGroup = ''
  @observable content = ''
  @observable bookActive = 1;
  @observable chapterActive = 1
  @observable currentRef = 'eng_ulb'
  @observable bookData = Constant.booksList
  @observable bookName = ''
  @observable translationContent =  ''
  @observable step = 1
  @observable max = 40
  @observable min = 14
  // @observable currentValue = 14
  // @observable fontSize = 14

  constructor(bookId, chapterId, bookChapter, activeTab, showModalBooks, bookChapterContent, chunkGroup, content, currentRef, booksList){

  }  
}
export default new TodoStore