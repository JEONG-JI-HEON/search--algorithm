import React, { useEffect, useState } from "react";

import { AudioOutlined } from "@ant-design/icons";
import { Input, Space, AutoComplete } from "antd";
import axios from "axios";

const { Search } = Input;

const App = () => {
  const [options, setOptions] = useState([]);

  const onSearch = (value, _e, info) => {
    console.log(value);
    console.log(_e);
    console.log(info);
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

  const wordList = [
    "가나다",
    "가구",
    "가까이",
    "가끔",
    "가난",
    "가시",
    "가을",
    "가정",
    "가족",
    "가치",
    "니은",
    "디듣",
    "aaa",
  ];

  const getWordData = async (keyword) => {
    const client_id = "7DNwi7pmfr4ujhzlilNS";
    const client_secret = "GWrvJT5l6V";

    const url = "/v1/search/encyc.json";
    const option = {
      params: { query: keyword },
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    };
    const response = await axios.get(url, option);
    console.log(response.data);
  };

  const handleSearch = (value) => {
    // 검색어를 기반으로 관련 검색어를 생성합니다.
    if (value) {
      console.log(value[0]);
      const initial = getInitial(value[0]);
      console.log(initial);
      const filteredWords = wordList.filter((word) => getInitial(word[0]) === initial);
      setOptions(filteredWords.map((word) => ({ value: word })));
    } else {
      setOptions([]);
    }
  };

  useEffect(() => {
    console.log(options);
    getWordData("가능");
  }, [options]);

  return (
    <Space direction="vertical">
      <AutoComplete options={options} onSearch={handleSearch}>
        <Search placeholder="검색어를 입력하세요" allowClear enterButton="Search" size="large" onSearch={onSearch} />
      </AutoComplete>
    </Space>
  );
};
export default App;
