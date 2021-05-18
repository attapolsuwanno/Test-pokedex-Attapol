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
// import { Footer } from "./component/footer";
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

const Mycard = [
  {
    id: "ex8-98",
    name: "Deoxys ex",
    nationalPokedexNumber: 386,
    imageUrl: "https://images.pokemontcg.io/ex8/98.png",
    imageUrlHiRes: "https://images.pokemontcg.io/ex8/98_hires.png",
    supertype: "Pokémon",
    subtype: "EX",
    ability: {
      name: "Form Change",
      text: "Once during your turn (before your attack), you may search your deck for another Deoxys ex and switch it with Deoxys ex. (Any cards attached to Deoxys ex, damage counters, Special Conditions, and effects on it are now on the new Pokémon.) If you do, put Deoxys ex on top of your deck. Shuffle your deck afterward. You can't use more than 1 Form Change Poké-Power each turn.",
      type: "Poké-Power",
    },
    hp: "110",
    retreatCost: ["Colorless", "Colorless"],
    convertedRetreatCost: 2,
    number: "98",
    artist: "Mitsuhiro Arita",
    rarity: "Rare Holo EX",
    series: "EX",
    set: "Deoxys",
    setCode: "ex8",
    text: [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards.",
    ],
    attacks: [
      {
        cost: ["Psychic", "Colorless", "Colorless"],
        name: "Psychic Burst",
        text: "You may discard 2 Energy attached to Deoxys ex. If you do, this attack does 50 damage plus 20 more damage for each Energy attached to the Defending Pokémon.",
        damage: "50+",
        convertedEnergyCost: 3,
      },
    ],
    weaknesses: [
      {
        type: "Psychic",
        value: "×2",
      },
    ],
    type: "Psychic",
  },
  {
    id: "dp6-90",
    name: "Cubone",
    nationalPokedexNumber: 104,
    imageUrl: "https://images.pokemontcg.io/dp6/90.png",
    imageUrlHiRes: "https://images.pokemontcg.io/dp6/90_hires.png",
    supertype: "Pokémon",
    subtype: "Basic",
    hp: "60",
    retreatCost: ["Colorless"],
    convertedRetreatCost: 1,
    number: "90",
    artist: "Kagemaru Himeno",
    rarity: "Common",
    series: "Diamond & Pearl",
    set: "Legends Awakened",
    setCode: "dp6",
    attacks: [
      {
        cost: ["Colorless"],
        name: "Headbutt",
        text: "",
        damage: "10",
        convertedEnergyCost: 1,
      },
      {
        cost: ["Fighting", "Colorless"],
        name: "Bonemerang",
        text: "Flip 2 coins. This attack does 20 damage times the number of heads.",
        damage: "20×",
        convertedEnergyCost: 2,
      },
    ],
    resistances: [
      {
        type: "Lightning",
        value: "-20",
      },
    ],
    weaknesses: [
      {
        type: "Water",
        value: "+10",
      },
    ],
    type: "Fighting",
  },
];

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataListCard, setDataListCard] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [dataStruc, setDataStruc] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3030/api/cards")
      .then((res) => {
        console.log("Hi my", res.data.cards);
        setDataListCard(res.data.cards);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredData(
      dataListCard.filter((card) =>
        card.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    Call();
  }, [search, dataListCard]);

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

  const Call = () => {
    const filterMap = dataListCard.map((item) => ({
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
      happiness: 5,
    }));
    setDataStruc(filterMap);
    console.log("New Data", filterMap);
  };

  const calDamage = (item) => {
    console.log("calDamage", item);
    var totalDamage = 0;
    for (var i = 0; i < item?.length; i++) {
      totalDamage = totalDamage + (item[i]?.damage).match(/(\d+)/);
    }
    return 60;
  };

  return (
    <div className="App">
      <div style={{ height: "660px", overflow: "auto" }}>
        <List
          grid={{
            gutter: 4,
            column: 2,
          }}
          dataSource={dataStruc}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                // extra={
                //   show ? (
                //     <ButtonDelete type="text" onClick={showModal}>
                //       X
                //     </ButtonDelete>
                //   ) : null
                // }
                // onMouseEnter={mouseHover}
                // onMouseLeave={mouseHover}
              >
                <div>
                  <Row>
                    <Col flex={2}>
                      <Image preview={false} width={100} src={item.imageUrl} />
                    </Col>
                    <Col flex={3}>
                      <h1>{item.name}</h1>
                      <div>
                        <Row>
                          <Col flex={2}>HP</Col>
                          <Col flex={3}>
                            <Progress percent={item.hp} />
                          </Col>
                        </Row>
                        <Row>
                          <Col flex={2}>STR</Col>
                          <Col flex={3}>
                            <Progress percent={item.strength} />
                          </Col>
                        </Row>
                        <Row>
                          <Col flex={2}>WEAK</Col>
                          <Col flex={3}>
                            <Progress percent={item.weakness} />
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
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 700 }}
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
                  <ButtonDelete type="text" onClick={showModal}>
                    Add
                  </ButtonDelete>
                  <div>
                    <Row>
                      <Col flex={1}>
                        <Image width={100} src={item.imageUrl} />
                      </Col>
                      <Col flex={4}>
                        <h1>{item.name}</h1>
                        <div>
                          <Row>
                            <Col flex={2}>HP</Col>
                            <Col flex={3}>
                              <Progress percent={item.hp} />
                            </Col>
                          </Row>
                          <Row>
                            <Col flex={2}>STR</Col>
                            <Col flex={3}>
                              <Progress percent={item.strength} />
                            </Col>
                          </Row>
                          <Row>
                            <Col flex={2}>WEAK</Col>
                            <Col flex={3}>
                              <Progress percent={item.weakness} />
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
        <Button onClick={showModal}>Primary Button</Button>
      </FooterStyled>
    </div>
  );
};
const CardShowItem = styled.div``;

// const ModalCuttom = styled(AntModal)`
//   width: 1000;
//   marginbuttom: 0px;
// `;

const ButtonDelete = styled(AntButton)`
  color: red;
  position: absolute;
  z-index: 1;
  right: 0px;
  fontfamily: Atma;
`;

const Button = styled(AntButton)`
  border-radius: 50px;
  // background: #ec5656;
  background: black;
  border: #ec5656;
  color: white;
  height: 100px;
  width: 100px;
`;
const ScallListSearch = styled.div`
  overflow: auto;
  height: 480px;
`;

const FooterStyled = styled.div`
  background: #ec5656;
  text-align: center;
  height: 52px;
`;

export default App;
