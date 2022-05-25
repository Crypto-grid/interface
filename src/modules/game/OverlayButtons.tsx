import React from 'react';
import { Row, Col, Button } from 'antd';


interface inventoryProps {
  openInventory: any,
  openStore: any
}


export const OverlayButtons = ({ openInventory, openStore }: inventoryProps ) => {
    const marginBetweenButtons = 50;
    const left = (
        <div
          style={{
            position: 'fixed',
            textAlign: 'left',
            left: 0,
            top: 250,
            padding: 10,
          }}>
            <Col>
            <Row align="middle" gutter={[4, 4]} style={{ marginBottom: marginBetweenButtons }}>
                <Button
                    onClick={openStore}
                    size="large"
                    shape="round">
                    <span
                    style={{
                        // marginRight: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    role="img"
                    aria-label="support">
                    🏪 Store
                    </span>
                </Button>
              </Row>
              <Row>

              </Row>
            
              <Row align="middle" gutter={[4, 4]} style={{ marginBottom: marginBetweenButtons }}>
                
                <Button
                    onClick={(): void => {
                    window.open('https://opensea.io/assets?search[query]=cryptogrid');
                    }}
                    size="large"
                    shape="round">
                    <span
                    style={{
                        // marginRight: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    role="img"
                    aria-label="support">
                    💲 NFT MarketPlace
                    </span>
                    
                </Button>

              </Row>
              <Row>
                <Button
                    onClick={(): void => {
                    window.open("https://sushi.com");
                    }}
                    size="large"
                    shape="round">
                    <span
                    style={{
                        // marginRight: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    role="img"
                    aria-label="support">
                    🍣 Sushi Swap
                    </span>
                </Button>
              </Row>
            </Col>
        </div>
          );
    const right = (
        <div 
          style={{ position: 'fixed', textAlign: 'right', right: 0, top: 250, padding: 10, zIndex: 5 }}>
            <Col>
              <Row align="middle" gutter={[4, 4]} justify="end" style={{ marginBottom: marginBetweenButtons }}>
                  <Button
                          onClick={openInventory}
                          size="large"
                          shape="round">
                          <span
                          style={{
                              marginLeft: 0,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                          }}
                          role="img"
                          aria-label="support">
                          ⛏️ Inventory
                          </span>
                          
                      </Button>

              </Row>
              <Row align="middle" gutter={[4, 4]} justify="end" style={{ marginBottom: marginBetweenButtons }}>
                <Button
                    onClick={openInventory}
                    size="large"
                    shape="round">
                    <span
                    style={{
                        marginLeft: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    role="img"
                    aria-label="support">
                    💸 Rebirth
                    </span>
                    
                </Button>
              </Row>
              <Row>
                <Button
                    onClick={openInventory}
                    size="large"
                    shape="round">
                    <span
                    style={{
                        marginLeft: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    role="img"
                    aria-label="support">
                    🔥 Sacrifice
                    </span>
                    
                </Button>
              </Row>                         
            </Col>
            
        </div>
          );


  return (
    <>
      {left}
      {right}
    </>
  )
}






