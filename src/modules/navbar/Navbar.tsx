import { useWeb3React } from "@web3-react/core"
import React, { useEffect } from "react"
import logo from "/logosmall.png"

interface navProps {
    gridBalanceFormatted: any,
  }
export const Navbar = ({gridBalanceFormatted}: navProps) => {
    return (
        <React.Fragment>
            <div className="flex items-center w-full overflow-hidden">
                <div className="flex-l rounded-md justify-start">
                    <img src={logo} alt="logo" className="h-12 w-auto" />
                </div>
                <div className="flex-none justify-end">
                    <button>Account</button>
                </div>
            </div>

            <div style={{ position: 'fixed', textAlign: 'right', right: 0, top: 0, padding: 10, zIndex: 1 }}>
              Balance: {(gridBalanceFormatted)?gridBalanceFormatted : 0}$GRID  
            </div>
        </React.Fragment>

    )
}