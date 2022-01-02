import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
  const { device } = useContext(Context)
  console.log(`device.devices`, JSON.stringify(device.devices, null, 2))
  return (
    <>
      <h1 className="mb-3">Стройматериалы <span className="text-secondary">({device.totalCount})</span></h1>
      <Row className="d-flex g-3">
        {device.devices.map(device =>
          <DeviceItem key={device.id} device={device} />
        )}
      </Row>
    </>
  );
});

export default DeviceList;
