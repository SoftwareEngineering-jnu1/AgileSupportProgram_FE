import React, { useState } from 'react';
import style from './Memo.module.css';
import {IoIosAdd} from "react-icons/io"; /*메모 추가 아이콘*/
import { BsSortDown } from "react-icons/bs"; /*메모 정렬 아이콘*/
import { IoIosArrowRoundUp } from "react-icons/io"; /*up 정렬 아이콘*/
import { IoIosArrowRoundDown } from "react-icons/io"; /*down 정렬 아이콘*/
import { PiNoteLight } from "react-icons/pi"; /*메모페이지 배경 아이콘*/

interface ModalData {
  id: number;
  title: string;
  content: string;
  timestamp: number;
}

const MemoPage: React.FC = () => {
  const [savedModals, setSaveModals] = useState<ModalData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<ModalData | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [sortedNewst, setsortedNewst] = useState(true);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
    setNoteTitle('');
    setModalContent('');
  };

  const handleSaveModal = () => {
    if (currentNote) {
      setSaveModals(savedModals.map(modal => modal.id === currentNote.id ? {...modal, title: noteTitle, content: modalContent} : modal));
    }
      else {
      const newModal: ModalData = {
        id: Date.now(),
        title: noteTitle,
        content: modalContent,
        timestamp: Date.now(),
      };
      setSaveModals([newModal, ...savedModals]);
      setIsModalOpen(false);
      }
      handleCloseModal();
  };
  const deletememo = (id: number) => {
    if(window.confirm('정말로 이 메모를 삭제하시겠습니까?')) {
      setSaveModals(savedModals.filter(modal => modal.id !== id));
    }
  };
  const editNote = (modal: ModalData) => {
    setCurrentNote(modal);
    setNoteTitle(modal.title);
    setModalContent(modal.content);
    handleOpenModal();
  };

  const sortmemo = () => {
    const sorted = [...savedModals].sort((a,b) => sortedNewst ?  a.timestamp - b.timestamp : b.timestamp - a.timestamp);
    setSaveModals(sorted);
    setsortedNewst(!sortedNewst);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} 
    ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  return (
    <div className={style.memopagediv}>
      <div className={style.backgrounddiv}>
        { savedModals.length === 0 ? (
          <p className={style.pp}> <PiNoteLight className={style.memopagebackicon}/> <br/> <span className={style.span}>생성된 메모가 없습니다</span><br/> 메모를 생성해 데일리 스크럼을 기록하거나 간단한 메모를 해보세요!</p>
        ) : (
          savedModals.map((memo, index) => <p key={index}></p>)
      )}
      </div>
      
      <button className={style.memoadd} onClick={handleOpenModal}>
        <IoIosAdd className={style.addicon}/>
      </button>
      <div className={style.sortdiv}> 
        <BsSortDown className={style.memosorticon}/><p> 만든 날짜 순</p><p className={style.p2}>|</p>
        <p className={style.memosort} onClick={sortmemo}>
        {sortedNewst ? <IoIosArrowRoundDown className={style.sorticon}/> : <IoIosArrowRoundUp className={style.sorticon}/>}</p>
      </div>
      

      {isModalOpen && (
        <div className={style.overlay}>
          <div className={style.modaldiv}>
            <span className={style.close} onClick={handleCloseModal}>&times;</span>
            <input className={style.title}
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="제목"
            />
            <textarea className={style.textarea}
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
              placeholder="내용"
              ></textarea>
            <button className={style.savebutton} onClick={handleSaveModal}>저장</button>
            
          </div>
        </div>
      )}

      <div className={style.savemodal}>
        {savedModals.map((modal) => (
          <div key={modal.id} className={style.modalitem} onClick={() => editNote(modal)}>
            <h3>생성날짜: {formatDate(modal.timestamp)}</h3>
            <h3>제목: {modal.title}</h3>
            <p className={style.memocontent}>{modal.content}</p>
            <span className={style.deletememobutton} onClick={(e) => { e.stopPropagation(); deletememo(modal.id)}}>&times;</span>
          </div>
        )
      )}
      </div>
    </div>
  );
};

export default MemoPage;
