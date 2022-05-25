import React from 'react'
import { Tab, Tabs, Button, Modal, Row, Col } from 'react-bootstrap'

import { Exchange } from './Exchange'

    // const Exchange = 
    // needs state for openModal
    // needs interface
    interface StoreModalProps{
        storeModalOpen: any,//how to send in storeModalParams??
        storeModalParams: any,
        closeStore: any,
    }

export const StoreModal = ({ storeModalOpen, storeModalParams, closeStore}: StoreModalProps) => {



  return (

    <React.Fragment>
        <Modal dialogClassName="inventoryModal"
        style={{zIndex: 9999, position: 'absolute'}}
        // show={true}
        show={storeModalOpen}
        onHide={closeStore}
        backdrop="static"
        keyboard={false}
        size="xl"
        defaultActiveKey
        >
            <Modal.Header closeButton>
                <Modal.Title>
                <span style={{color: 'black'}}>Store</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" defaultActiveKey="upgrade">
                    <Tab eventKey="upgrade" title="$Upgrade">
                        < Exchange />
                    </Tab>
                    <Tab eventKey="equipment" title="Equipment">
                    💻 Equipment Store
                    </Tab>
                    <Tab eventKey="rebirths" title="Rebirths">
                        🚧 Work in Progress

                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeStore}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </React.Fragment>
  )
}
