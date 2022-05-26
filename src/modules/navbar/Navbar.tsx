import { useWeb3React } from "@web3-react/core"
import React, { useEffect, useState } from "react"
import logo from "/logosmall.png"
import { Account } from 'eth-components/ant';
import { getContractAddress } from '@ethersproject/address';
// import { ethers } from 'hardhat';

export const Navbar = () => {

	// async function main() {
	// 	const [owner] = await ethers.getSigners()
	  
	// 	const transactionCount = await owner.getTransactionCount()
	  
	// 	const futureAddress = getContractAddress({
	// 	  from: owner.address,
	// 	  nonce: transactionCount
	// 	})
	//   }

    const network =`http://localhost:8545`; // url to be hardhat localhost
    // ethers.getDefaultProvide([network, [options]])

    // deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	let contractAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';//to be taken from Account.Sol
	const contract_abi = ``; // to be taken form Account.Sol

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null); //account number!!
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) { // is etheruem right?? - note metamask only

			window.ethereum.request({ method: 'eth_requestAccounts'}) // asks to connect // should this change from ethereum??
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render // not needed
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, contract_abi, tempSigner);
		setContract(tempContract);	
	}

	const setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
		contract.set(event.target.setText.value);
	}

	const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}



    const right = (
        <div style={{ position: 'fixed', textAlign: 'right', right: 0, top: 0, padding: 10, zIndex: 1 }}>
        {/* <Account
          createLoginConnector={props.scaffoldAppProviders.createLoginConnector}
          ensProvider={props.scaffoldAppProviders.mainnetAdaptor?.provider}
          price={props.price}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
          hasContextConnect={true}
        /> */}
        Test
		<div>
		{/* <h4> {"Get/Set Contract interaction"} </h4> */}
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			{/* <form onSubmit={setHandler}>
				<input id="setText" type="text"/>
				<button type={"submit"}> Update Contract </button>
			</form> */}
			<div>
			<button onClick={getCurrentVal} style={{marginTop: '5em'}}> Get Current Contract Value </button>
			</div>
			{currentContractVal}
			{errorMessage}
		</div>
      </div>
    )


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
			{right}
		</React.Fragment>

    )
}