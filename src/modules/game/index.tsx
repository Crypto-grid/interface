import React, { useState } from 'react';
import StyledThreeComponent from './style';
import ThreeCanvas from '../../classes/ThreeCanvas';
import AppState from '../../stores/App';
import { Button, Modal, Row, Col } from 'react-bootstrap';

import { OverlayButtons } from './OverlayButtons'
import { StoreModal } from './StoreModal'
import './miningModal.css'
import './inventoryModal.css'
import { fromJSON } from 'postcss';

interface IState {
  initialized: boolean;
  inventoryItems: IInventoryModel[],
  hiddenInventoryItems: Set<number>,
}

interface IInventoryModel {
  src: string,
  name: string
}

class ThreeComponent extends React.Component<{}, IState> {
  private threeCanvasEl: React.RefObject<HTMLDivElement>;
  static contextType = AppState;
  // private inventoryOpen: any;

  constructor(props: any) {
    super(props);

    this.state = {
      initialized: false,
      storeModalOpen: false,
      storeParams: {},
      modalOpen: false,
      modelParams: {},
      inventoryOpen: false,
      inventoryParams: {},
      inventoryItems: [],
      hiddenInventoryItems: new Set<number>(),
      temp: 8,
      hash: 0,
      earnings: 0
    };

    this.threeCanvasEl = React.createRef();
  }

  componentDidUpdate() {
    // const { SOME_VAR } = this.context; // get a var from React Context
  }

  componentDidMount() {
    if (!this.state.initialized) {
      this.init();
    }

  }


  init = () => {
    // const appState = this.context; // access to the React Context store

    this.threeCanvas = new ThreeCanvas({
      mountPoint: this.threeCanvasEl.current as HTMLDivElement,
      width: this.threeCanvasEl.current!.clientWidth,
      height: this.threeCanvasEl.current!.clientHeight,
    });
    this.threeCanvas.setProps({
      openModal: this.openModal,
      itemsAppear: this.itemsAppear
    });
    // start draw loop
    this.startDrawing(this.threeCanvas);
    this.setState({ initialized: true });
  }

  // openStore = (storeParams) => { //openstoremodal
  openStore = () => { //openstoremodal
    // this.setState({storemodalOpen: true, storeParams});
    this.setState({storeModalOpen: true});

  }

  closeStore = () => { //openstoremodal
    this.setState({storeModalOpen: false});
  }


  // functional component therefore need to do old school way for useState
  openModal = (modelParams) => {
    console.log('modal opened');
    this.setState({ modalOpen: true, modelParams });
    const timerId = setInterval(// if modal open
      () => this.tick(),
      1000
    );
  }

  tick() {
    this.setState(prevState => { 
      return {temp: prevState.temp*1.05} 
    })
    this.setState(prevState => {
      return { hash: (prevState.hash + 1) * 1.005 }
    })
    this.setState(prevState => {
      return { earnings: (prevState.earnings + 0.0001) }
    })
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  openInventory = () => {
    this.getInventoryItems();
    this.setState({ inventoryOpen: true, hiddenInventoryItems: new Set<number>() });
  }

  closeInventory = () => {
    this.setState({ inventoryOpen: false });
  }

  //itemsAppear = (inventoryParams, threeCanvas: ThreeCanvas) => { //inventory params: initially just .scene to be passed from three js (later .name of item to appear) 
  itemsAppear = (inventoryParams) => { //inventory params: initially just .scene to be passed from three js (later .name of item to appear) 
    console.log('in tem==>>', inventoryParams);
    this.setState({ inventoryParams });
    // this.threeCanvas.threeMeshAppear("Screen", inventoryParams.scene);
  }

  startDrawing(threeCanvas: ThreeCanvas) {
    const renderLoop = () => {
      threeCanvas.render();
    };
    // threeCanvas.test();
    threeCanvas.setAnimationLoop(renderLoop);
  }

  /**
   * @todo fetch items dynamically
   * @returns 
   * todos: 
   * item selected from inventory modal: (i) add to scene - using: this.threeCanvas.threeMeshAppear("<objectName>", inventoryParams.scene)
   *                                    (ii) add to a scene items array
   *                                    (iii) remove from inventory items array
   */
  getInventoryItems = (): void => {
    const inventoryItems = [
      {
        src: './Computer01.png',
        name: 'Screen' // note: name changed to be the same as corresponding object.name in three js
      },
      {
        src: './compTower.jpg',
        name: 'Tower'
      },
      {
        src: './Computer01.png',
        name: 'Screen'
      }
    ];
    this.setState({ inventoryItems });
  }

  hideInventoryItem = (index: number): void => {
    // todo: also should add item to scene: this.threeCanvas.threeMeshAppear("<objectName>", inventoryParams.scene)
    this.setState(prevState => {
      const newSet = new Set(prevState.hiddenInventoryItems);
      newSet.add(index);
      return { hiddenInventoryItems: newSet }
    });
  }

  getInventoryItemsJsx = (): JSX.Element[] => {
    const { inventoryItems, hiddenInventoryItems } = this.state;
    const jsx = [];
    for (let i = 0; i < inventoryItems.length; i += 2) {
      jsx.push(
        <Row key={i}>
          <Col>
            <div className='item-container row-bottom-margin'>
              <div className='item-display-container'>
                <div className='item-display'>
                  {!hiddenInventoryItems.has(i) && <img className="item-pic"
                    src={inventoryItems[i].src}
                    alt={inventoryItems[i].name}
                    onClick={() => this.hideInventoryItem(i)}
                  />}
                </div>
              </div>
            </div>
          </Col>
          {inventoryItems[i + 1] && <Col xs={6}>
            <div className='item-container row-bottom-margin'>
              <div className='item-display-container'>
                <div className='item-display'>
                  {!hiddenInventoryItems.has(i + 1) && <img className="item-pic"
                    src={inventoryItems[i + 1].src}
                    alt={inventoryItems[i + 1].name}
                    onClick={() => this.hideInventoryItem(i + 1)}
                  />}
                </div>
              </div>
            </div>
          </Col>}
        </Row>
      )
    }
    return jsx;
  }

  render() {
    const { modalOpen, modelParams, inventoryOpen, inventoryParams, temp, hash, earnings, storeModalOpen, storeModalParams } = this.state;
    console.log(modalOpen);
    // temporary output for mining os temp, hashrate and earnings - to be received from smart contract rewards.sol
    const tempRounded = (temp < 95) ? Math.round(temp * 10) / 10 : 95;
    const hashRounded = (hash < 147) ? Math.round(hash * 10) / 10 : 147;
    const earningsRounded = Math.round(earnings * 1000) / 1000;

    return (
      <React.Fragment>

        {<Modal dialogClassName="miningModal"
          style={{ zIndex: 9999, position: 'absolute' }}
          show={modalOpen}
          onHide={this.closeModal}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>{modelParams.name}</Modal.Title> */}
            <Modal.Title>
              <span style={{ color: 'black' }}>Gridboard</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Temp</th>
                  <th scope="col">Load</th>
                  <th scope="col">Fan Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{tempRounded}C°</td>
                  <td>50%</td>
                  <td>20%</td>
                </tr>
              </tbody>
            </table>
            <Row>
              <Col>
                <div className='app-container'>
                  <div className='temperature-display-container'>
                    <div className='temperature-display'>{tempRounded}°C</div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className='app-container'>
                  <div className='temperature-display-container'>
                    <div className='temperature-display'>{hashRounded}MH/S</div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className='app-container'>
                  <div className='temperature-display-container'>
                    <div className='temperature-display'>{earningsRounded}gETH</div>
                  </div>
                </div>
              </Col>
            </Row>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary">⚡Restart Machine</Button>
          </Modal.Footer>
        </Modal>}
        {/* inventory modal below */}
        {<Modal dialogClassName="inventoryModal"
          style={{ zIndex: 9999, position: 'absolute' }}
          show={inventoryOpen}
          onHide={this.closeInventory}
          backdrop="static"
          keyboard={false}
        // size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span style={{ color: 'black' }}>Inventory</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.getInventoryItemsJsx()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeInventory}>
              Close
            </Button>
            {/* needs to action appearItems for all inventory items */}
            <Button variant="primary" onClick={() => {
              this.threeCanvas.threeMeshAppear("Screen", inventoryParams.scene)
              this.threeCanvas.threeMeshAppear("TestMachine", inventoryParams.scene)
              }}>
              Select All Items
            </Button>
          </Modal.Footer>
        </Modal>}
        <StoreModal storeModalOpen={storeModalOpen} storeModalParams={storeModalParams} closeStore={this.closeStore}/>
        <StyledThreeComponent
          className="threeComponent"
          initialized={this.state.initialized}
        >
          <div className="visualizationMount" ref={this.threeCanvasEl}>
          
          <OverlayButtons openInventory={this.openInventory} openStore={this.openStore}/>
      
          {/* overlay button to open inventory setModalOpen={setModalOpen}*/}
          </div>
        </StyledThreeComponent>

      </React.Fragment>
    );
  }
}

export default ThreeComponent;
