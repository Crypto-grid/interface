import React from 'react'
import './exchange.css'

export const Exchange = () => {
  return (
    <>
    <div>💱 Exchange</div>
    <div className="container">
        <div className="row">
            <div className="col col-md-6 offset-md-3" id="window">
                <h4>Swap</h4>
                <div id="form">
                    <div className="swapbox">
                        <div className="swapbox_select token_select" id="from_token_select">
                            <img className="token_image" id="from_token_img"/>
                            <span id="from_token_text"></span>
                        </div>
                        <div className="swapbox_select">
                          $gETH
                            {/* <input className="number form-control" placeholder="amount" id="from_amount"/> */}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                    <span>⬇️</span>
                    </div>
                    <div className="swapbox">
                        <div className="swapbox_select token_select"  id="to_token_select">
                            <img className="token_image" id="to_token_img"/>
                            <span id="to_token_text"></span>
                        </div>
                        <div className="swapbox_select">
                          $UPGRADE
                            {/* <input className="number form-control" placeholder="amount" id="to_amount"/> */}
                        </div>
                    </div>
                    <div>Estimated Gas: <span id="gas_estimate"></span></div>
                    <button disabled className="btn btn-large btn-primary btn-block" id="swap_button">
                        Swap
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div className="modal" id="token_modal" role="dialog">
      {/* tabindex="-1" */}
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select token</h5>
              <button id="modal_close" type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div id="token_list"></div>
            </div>
          </div>
        </div>
      </div>=
    </>
  )
}
