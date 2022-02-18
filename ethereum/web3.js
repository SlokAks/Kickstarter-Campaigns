import Web3 from "web3";
 
let web3;

// typeof window returns 'object' in browser in console in server returns 'undefined'
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum); // Hijack metamask provider
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/ec073e5986c84144b2cbdb4ad81cfded"
  );
  web3 = new Web3(provider);
}
 
export default web3;