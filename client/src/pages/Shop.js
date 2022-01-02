import React, { useContext, useEffect } from 'react';
import { Container, Accordion, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { device } = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(null, null, 1, 2).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand])

  return (
    <Container fluid
      className="py-3 px-4"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <Row className="mt-2">
        <Col md={2}>
          <Accordion defaultActiveKey="0">

            <TypeBar />
            <BrandBar />
          </Accordion>
        </Col>
        <Col md={9}>
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
    // <Container fluid>
    //   <TypeBar />
    //   <BrandBar />
    //   <DeviceList />
    //   <Pages />
    // </Container>
  );
});

export default Shop;
