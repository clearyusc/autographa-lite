import { computed, observable } from "mobx"
const session =  require('electron').remote.session

export class TodoStore {
  @observable bookId = '1'
  @observable chapterId = '1'
  @observable bookChapter = { bookId: 0, chapterLength: 0 }
  @observable activeTab = 1
  @observable showModalBooks = false
  @observable bookChapterContent = ''
  @observable bookActive = 1;
  @observable chapterActive = 1;
  @observable currentRef = 'eng_ulb'

  constructor(bookId, chapterId, bookChapter, activeTab, showModalBooks, bookChapterContent){

  }  
}
export default new TodoStore

