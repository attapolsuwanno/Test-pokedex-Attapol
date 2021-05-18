import React, { useState } from "react";
import "./App.css";
import { Button as AntButton, List, Card, Modal, Input } from "antd";

import styled from "styled-components";
import styledComponents from "styled-components";
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (value) => console.log(value);

  return (
    <div className="App">
      <div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={Mycard}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <div>{item.name}</div>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />

        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <FooterStyled>
        <Button onClick={showModal}>Primary Button</Button>
      </FooterStyled>
    </div>
  );
};

const Button = styled(AntButton)`
  border-radius: 13px;
  background: #ec5656;
  border: #ec5656;
`;

const FooterStyled = styled.div`
  background: #ec5656;
  text-align: center;
`;
// const ButtonAdd = styled.button`
//   border-radius: 13px;
// `;

export default App;
