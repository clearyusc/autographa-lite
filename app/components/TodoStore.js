import { computed, observable } from "mobx"
const session =  require('electron').remote.session

export class TodoStore {
  @observable bookId = '1'
  @observable chapterId = '1'
  @observable refId = 'eng_ulb'
  @observable bookChapter = { bookId: 0, chapterLength: 0 }
  @observable activeTab = 1
  @observable showModalBooks = false
  @observable bookChapterContent = ''
  @observable chunkGroup = ''
  @observable content = ''
  @observable bookActive = 1;
  @observable chapterActive = 1
  @observable currentRef = 'eng_ulb'


  constructor(bookId, chapterId, bookChapter, activeTab, showModalBooks, bookChapterContent,chunkGroup,content){

  }  
}
export default new TodoStore

