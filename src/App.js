import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  Button as AntButton,
  List,
  Card,
  Modal,
  Input,
  Image,
  Col,
  Row,
  Rate,
  Progress,
} from "antd";
import styled from "styled-components";
const { Search } = Input;

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
};

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [dataStruc, setDataStruc] = useState([]);
  const [myListCard, setMyListCard] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3030/api/cards")
      .then((res) => {
        Call(res.data.cards);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredData(
      dataStruc.filter((card) =>
        card.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, dataStruc]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (value) => setSearch(value);
  const mouseHover = () => setShow((prev) => !prev);

  const Call = (dataAll) => {
    const filterMap = dataAll.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      hp: item.hp < 100 ? 100 : 0,
      strength:
        item?.attacks?.length === 2
          ? 2 * 50
          : item?.attacks?.length === 1
          ? 1 * 50
          : 0,
      weakness: item?.weaknesses?.length === 1 ? 100 : 0,
      damage: calDamage(item.attacks),
      happiness: calHappiness(item?.hp, item?.attacks, item?.weaknesses),
    }));
    setDataStruc(filterMap);
    console.log("New Data", filterMap);
  };

  const calHappiness = (Hp, Damage, Weakness) => {
    const a =
      ((Hp < 100 ? 100 : 0) / 10 +
        calDamage(Damage) / 10 +
        10 -
        (Weakness?.length === 1 ? 100 : 0)) /
      5;
    return a;
  };

  const calDamage = (item) => {
    var totalDamage = [];
    for (var i = 0; i < item?.length; i++) {
      totalDamage = totalDamage + item[i]?.damage;
    }
    const cutArray = totalDamage.length == 0 ? "0" : totalDamage;
    const extractNumber = cutArray?.match(/\d+/)[0];
    const sum = extractNumber <= 50 ? 50 : extractNumber <= 20 ? 20 : 0;
    return sum;
  };

  const handleAddItem = (e) => {
    setDataStruc(dataStruc.filter((item) => item.name !== e.name));
    setMyListCard([...myListCard, e]);
  };

  const handleRemoveItem = (e) => {
    setMyListCard(myListCard.filter((item) => item.name !== e.name));
    setDataStruc([...dataStruc, e]);
  };

  return (
    <div className="App">
      <TextTitle>My Pokedex</TextTitle>
      <div style={{ height: "550px", overflow: "auto" }}>
        <List
          grid={{
            gutter: 4,
            column: 2,
          }}
          dataSource={myListCard}
          renderItem={(item) => (
            <List.Item>
              <Card hoverable>
                <div>
                  <ButtonCustomCard
                    type="text"
                    onClick={() => handleRemoveItem(item)}
                  >
                    X
                  </ButtonCustomCard>
                  <Row>
                    <Col flex={2}>
                      <Image preview={false} width={100} src={item.imageUrl} />
                    </Col>
                    <Col flex={3}>
                      <TextCustomH1>{item.name}</TextCustomH1>
                      <div>
                        <Row>
                          <Col flex={1}>
                            <Row>
                              <TextCustom>HP</TextCustom>
                            </Row>
                            <Row>
                              <TextCustom>STR</TextCustom>
                            </Row>
                            <Row>
                              <TextCustom>WEAK</TextCustom>
                            </Row>
                          </Col>
                          <Col flex={4}>
                            <Row>
                              <Progress showInfo={false} percent={item.hp} />
                            </Row>
                            <Row>
                              <Progress
                                showInfo={false}
                                percent={item.strength}
                              />
                            </Row>
                            <Row>
                              <Progress
                                showInfo={false}
                                percent={item.weakness}
                              />
                            </Row>
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <Rate disabled defaultValue={item.happiness} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <CustomSearchBar
          placeholder="Find pokemon"
          onSearch={onSearch}
          style={{ width: 720 }}
        />
        <ScallListSearch>
          <List
            grid={{
              column: 1,
            }}
            itemLayout="horizontal"
            dataSource={filteredData}
            renderItem={(item) => (
              <List.Item>
                <Card hoverable>
                  <ButtonCustomCard
                    type="text"
                    onClick={() => handleAddItem(item)}
                  >
                    Add
                  </ButtonCustomCard>
                  <div>
                    <Row>
                      <Col flex={1}>
                        <Image
                          preview={false}
                          width={100}
                          src={item.imageUrl}
                        />
                      </Col>
                      <Col flex={4}>
                        <TextCustomH1>{item.name}</TextCustomH1>
                        <div>
                          <Row>
                            <Col flex={1}>
                              <Row>
                                <TextCustom>HP</TextCustom>
                              </Row>
                              <Row>
                                <TextCustom>STR</TextCustom>
                              </Row>
                              <Row>
                                <TextCustom>WEAK</TextCustom>
                              </Row>
                            </Col>
                            <Col flex={4}>
                              <Row>
                                <Progress showInfo={false} percent={item.hp} />
                              </Row>
                              <Row>
                                <Progress
                                  showInfo={false}
                                  percent={item.strength}
                                />
                              </Row>
                              <Row>
                                <Progress
                                  showInfo={false}
                                  percent={item.weakness}
                                />
                              </Row>
                            </Col>
                          </Row>
                        </div>
                        <div>
                          <Rate disabled defaultValue={item.happiness} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </ScallListSearch>
      </Modal>
      <FooterStyled style={{}}>
        <ButtonCustom onClick={() => showModal()}>+</ButtonCustom>
      </FooterStyled>
    </div>
  );
};

const ButtonCustomCard = styled(AntButton)`
  color: red;
  position: absolute;
  z-index: 1;
  right: 0px;
  font-size: 30px;
  font-family: "Atma", cursive;
`;
const TextCustomH1 = styled.h1`
  font-size: 32px;
  font-family: "Gaegu", cursive;
`;

const TextCustom = styled.h2`
  font-size: 12px;
  font-family: "Atma", cursive;
`;

const CustomSearchBar = styled(Search)`
  font-size: 12px;
  font-family: "Atma";
`;

const TextTitle = styled.h1`
  text-align: center;
  font-size: 54px;
  font-family: "Atma", cursive;
`;

const ButtonCustom = styled(AntButton)`
  border-radius: 50px;
  background: #ec5656;
  border: #ec5656;
  color: white;
  height: 50px;
  width: 50px;
  font-size: 34px;
  font-family: "Atma", cursive;
`;
const ScallListSearch = styled.div`
  overflow: auto;
  height: 480px;
`;

const FooterStyled = styled.div`
  background: #ec5656;
  text-align: center;
  // justifycontent: "center";
  // justifyitems: "center";
  height: 52px;
`;

export default App;
