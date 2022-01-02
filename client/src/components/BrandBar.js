import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, Accordion } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context)

  return (

    <Accordion.Item eventKey="0">
      <Accordion.Header>Поставщики</Accordion.Header>
      <Accordion.Body className="p-0">
        <ListGroup className="my-2">
          <ListGroup.Item
            className="py-2 px-1"
            style={{ cursor: 'pointer' }}
            active={Object.entries(device.selectedBrand).length === 0}
            onClick={() => device.setSelectedBrand({})}
            key={'unical'}
          >
            Все поставщики
          </ListGroup.Item>
          {device.brands.map(brand =>
            <ListGroup.Item
              style={{ cursor: 'pointer' }}
              key={brand.id}
              className="py-2 px-1"
              onClick={() => device.setSelectedBrand(brand)}
              active={brand.id === device.selectedBrand.id}
            >
              {brand.name}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
});

export default BrandBar;
