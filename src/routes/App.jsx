import React, { useEffect, useState } from "react";

import { AutoComplete, Input, Space } from "antd";
import axios from "axios";

import { getJson } from "serpapi";

const { Search } = Input;

const App = () => {
  const [options, setOptions] = useState([]);
  const [nowSearch, setNowSearch] = useState();

  const onSearch = (value, _e, info) => {
    // console.log(value);
    // console.log(_e);
    // console.log(info);
  };

  const getInitial = (char) => {
    const initialOffset = 44032;
    const initialList = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    const uniCode = char.charCodeAt(0);
    if (uniCode < initialOffset || uniCode > 55203) {
      return char; // 한글이 아니면 그대로 반환
    }

    return initialList[Math.floor((uniCode - initialOffset) / 588)];
  };

  // const wordList = [
  //   "가나다",
  //   "가구",
  //   "가까이",
  //   "가끔",
  //   "가난",
  //   "가시",
  //   "가을",
  //   "가정",
  //   "가족",
  //   "가치",
  //   "니은",
  //   "디듣",
  //   "aaa",
  // ];

  let wordList = [];

  const searchGoogle = async (keyword) => {
    const url = "/v2/search.json";
    const options = {
      params: {
        engine: "google_autocomplete",
        q: keyword,
        hl: "ko", // 한국
        gl: "kr", // 한국
        api_key: "9441f6581bcbab3b38ee92c13aa12b1f0e0c003d53f3ca9d6a32dc2f13f0f5eb",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(url, options);
      const suggestions = response.data.suggestions;
      wordList = suggestions.map((item) => item.value);
      console.log(wordList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (value) => {
    // 검색어를 기반으로 관련 검색어를 생성합니다.
    setNowSearch(value);

    if (value) {
      // console.log(value[0]);
      const initial = getInitial(value[0]);
      // console.log(initial);
      const filteredWords = wordList.filter((word) => getInitial(word[0]) === initial);
      setOptions(filteredWords.map((word) => ({ value: word })));
    } else {
      setOptions([]);
    }
  };

  useEffect(() => {
    console.log(nowSearch);
    if (nowSearch) {
      wordList.length = 0;
      // getWordData(nowSearch);
      searchGoogle(nowSearch);
    }
  }, [nowSearch]);

  return (
    <Space direction="vertical">
      <AutoComplete options={options} onSearch={handleSearch}>
        <Search placeholder="검색어를 입력하세요" allowClear enterButton="Search" size="large" onSearch={onSearch} />
      </AutoComplete>
    </Space>
  );
};
export default App;
