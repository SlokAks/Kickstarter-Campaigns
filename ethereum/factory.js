import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x9339aFC88484530294609EF62a7fEB2FF004342b'
);

export default instance;
