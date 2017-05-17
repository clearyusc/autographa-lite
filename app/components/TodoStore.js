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
  @observable bookActive = 1;
  @observable chapterActive = 1;
  @observable currentRef = 'eng_ulb'
  @observable booksOT = ''
  @observable booksNT = ''
  @observable booksALL = ''
  @observable OTbooksstart = 0;
  @observable OTbooksend = 38;
  @observable NTbooksstart= 39;
  @observable NTbooksend= 65;
  // @observable booksList= '';

  constructor(bookId, chapterId, bookChapter, activeTab, showModalBooks, bookChapterContent,chunkGroup, booksOT, booksNT, booksALL, OTbooksstart,
    OTbooksend, NTbooksstart, NTbooksend, booksList){

  }  
}
export default new TodoStore

