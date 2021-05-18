import React from "react";
import { Card, Row, Col, Image, Progress, Rate } from "antd";

export const CardList = ({ dataList }) => {
  return (
    <>
      <Card>
        <div>
          <Row>
            <Col flex={2}>
              <Image width={100} src={dataList.imageUrl} />
            </Col>
            <Col flex={3}>
              <h1>{dataList.name}</h1>
              <div>
                <Row>
                  <Col flex={2}>HP</Col>
                  <Col flex={3}>
                    <Progress percent={30} />
                  </Col>
                </Row>
                <Row>
                  <Col flex={2}>STR</Col>
                  <Col flex={3}>
                    <Progress percent={30} />
                  </Col>
                </Row>
                <Row>
                  <Col flex={2}>WEAK</Col>
                  <Col flex={3}>
                    <Progress percent={30} />
                  </Col>
                </Row>
              </div>
              <Rate disabled defaultValue={2} />
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
};
