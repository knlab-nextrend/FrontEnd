import React, { useState, useEffect } from "react";
import MultilingualDictionary from "./MultilingualDictionary";
import { MultilingualDictionaryApi, sessionHandler } from "../../../Utils/api";
import { trackPromise } from "react-promise-tracker";
import { useDispatch } from "react-redux";
function MultilingualDictionaryContainer() {
  const dispatch = useDispatch();
  const [wordData, setWordData] = useState([]); // 단어 데이터
  const [currentWordData, setCurrentWordData] = useState([]); // 현재 보여질 결과
  const [dataAddOpen, setDataAddOpen] = useState(false);
  const [editWordIndex, setEditWordIndex] = useState(0); // 수정할 다국어 단어의 index
  const [editWordData, setEditWordData] = useState(""); // 수정할 다국어 단어의 data
  const [keyword, setKeyword] = useState(""); // 검색어
  const [addWordData, setAddWordData] = useState(""); // 추가할 데이터
  const dataAddOpenHandler = () => {
    setDataAddOpen(!dataAddOpen);
  };
  const addWordDataHandler = (e) => {
    setAddWordData(e.target.value);
  };
  const addWord = () => {
    if (addWordData === "") {
      alert("추가할 단어를 입력해주세요");
      return;
    } else {
      const data = { multi_text: addWordData };
      MultilingualDictionaryApi(data, "POST").then((res) => {
        if (res.status === 200) {
          alert("성공적으로 등록되었습니다.");
          dataFetch();
        }
      });
    }
  };
  const editWordOpen = (word) => {
    setEditWordIndex(word.IDX);
    setEditWordData(word.MULTI_TEXT);
  };
  const editWordCancel = () => {
    setEditWordIndex(0);
    setEditWordData("");
  };
  const editWordHandler = (e) => {
    setEditWordData(e.target.value);
  };
  const saveWord = (word) => {
    const data = { idx:word.IDX, multi_text: editWordData };
    MultilingualDictionaryApi(data, "PUT").then((res) => {
      if (res.status === 200) {
        alert("성공적으로 수정되었습니다.");
        editWordCancel();
        dataFetch();
      }
    });
  };
  const deleteWord = (word) => {
    const data = { idx:word.IDX };
    MultilingualDictionaryApi(data, "DELETE").then((res) => {
      if (res.status === 200) {
        alert("성공적으로 삭제되었습니다.");
        dataFetch();
      }
    });
  };
  const keywordHandler = (e) => {
    setKeyword(e.target.value);
  };

  const search = () => {
    setCurrentWordData(
      wordData.filter((word) => {
        return word.MULTI_TEXT.includes(keyword);
      })
    );
  };

  const dataFetch = () => {
    trackPromise(
      MultilingualDictionaryApi(null, "GET")
        .then((res) => {
            console.log(res.data)
            setWordData(res.data)
            setCurrentWordData(res.data);
        })
        .catch((err) => {
          sessionHandler(err, dispatch).then((res) => {
            MultilingualDictionaryApi(null, "GET").then((res) => {
                setWordData(res.data)
                setCurrentWordData(res.data);
            });
          });
        })
    );
  };

  useEffect(() => {
    dataFetch();
  }, []);

  useEffect(() => {
    if(currentWordData.length !== 0){
        setCurrentWordData(
            wordData.filter((word) => {
              return word.multi_text.includes(keyword);
            })
          );
    }

  }, [keyword]);

  return (
    <>
      <MultilingualDictionary
        dataAddOpen={dataAddOpen}
        dataAddOpenHandler={dataAddOpenHandler}
        currentWordData={currentWordData}
        editWordIndex={editWordIndex}
        editWordData={editWordData}
        editWordOpen={editWordOpen}
        editWordCancel={editWordCancel}
        editWordHandler={editWordHandler}
        saveWord={saveWord}
        deleteWord={deleteWord}
        keywordHandler={keywordHandler}
        search={search}
        addWord={addWord}
        addWordDataHandler={addWordDataHandler}
      />
    </>
  );
}
export default MultilingualDictionaryContainer;
