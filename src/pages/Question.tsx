import { Button, Card } from "antd";
import { useState } from "react";

function Question() {
  const [prompt, setPrompt] = useState("");
  const [description, setDescription] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [choice5, setChoice5] = useState("");

  const handleClick1 = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/temp-question?category=인물&type=1`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPrompt(data.prompt);
      setDescription(data.description.content);
      setChoice1(data.choiceList[0].content);
      setChoice2(data.choiceList[1].content);
      setChoice3(data.choiceList[2].content);
      setChoice4(data.choiceList[3].content);
      setChoice5(data.choiceList[4].content);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick2 = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/temp-question?category=인물&type=2`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPrompt(data.prompt);
      setDescription(data.description.content);
      setChoice1(data.choiceList[0].content);
      setChoice2(data.choiceList[1].content);
      setChoice3(data.choiceList[2].content);
      setChoice4(data.choiceList[3].content);
      setChoice5(data.choiceList[4].content);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button onClick={handleClick1}>1유형</Button>
      <Button onClick={handleClick2}>2유형</Button>
      <Card title="문제" style={{ width: 1000, margin: "0 auto" }}>
        <div>{"<문제> " + prompt}</div>
        <br />
        <div>{"<보기> " + description}</div>
        <br />
        <div>{"1. " + choice1}</div>
        <div>{"2. " + choice2}</div>
        <div>{"3. " + choice3}</div>
        <div>{"4. " + choice4}</div>
        <div>{"5. " + choice5}</div>
      </Card>
    </div>
  );
}

export default Question;
