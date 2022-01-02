import React from 'react';
import { useHistory } from "react-router-dom"
import { Card, Col, Button, Badge, Image } from "react-bootstrap";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const history = useHistory()
  return (
    <Col xl={3} md={4} sm={6}
      onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
      style={{ cursor: 'pointer' }}
      title={device.description}
    >
      <Card className="p-4 d-flex flex-column justify-content-between h-100"
      >
        <Image className="mx-auto"
          width={200} height={200} src={process.env.REACT_APP_API_URL + device.img} />
        <div className="mt-1">
          <small className="text-secondary mb-1 d-block">Код {device.id} </small>
          <p>{device.name}</p>
        </div>
        <div className="d-flex mb-2 align-items-center">
          <p
            className="text-dark mb-0 mr-2"
            style={{
              'font-size': '20px',
            }} >
            {device.price}₽
          </p>
          <Badge bg="secondary">за 1 шт.</Badge>
        </div>
        <p className="text-secondary mb-0">На складе ост.: {device.count} шт.</p>
      </Card>
    </Col>
  );
};

export default DeviceItem;
