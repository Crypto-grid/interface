import { useWeb3React } from "@web3-react/core"
import logo from "/logosmall.png"

export const Navbar = () => {
    const web3 = useWeb3React()
    return (
        <div className="flex items-center w-full overflow-hidden">
            <div className="flex-l rounded-md justify-start">
                <img src={logo} alt="logo" className="h-12 w-auto" />
            </div>
            <div className="flex-none justify-end">
                <button>Account</button>
            </div>
        </div>
    )
}