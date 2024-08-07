import React, { useState } from 'react';
import useStore from '@store/store';

import CollapseOptions from './CollapseOptions';
import GoogleSync from '@components/GoogleSync';
import { TotalTokenCostDisplay } from '@components/SettingsMenu/TotalTokenCost';
import PersonIcon from '@icon/PersonIcon';
import SettingIcon from '@icon/SettingIcon';
import SettingsMenu from '@components/SettingsMenu';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || undefined;
const solLogoUrl = 'https://cryptologos.cc/logos/solana-sol-logo.png';
const meetLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/2491px-Google_Meet_icon_%282020%29.svg.png';

const MenuOptions = () => {
  const hideMenuOptions = useStore((state) => state.hideMenuOptions);
  const countTotalTokens = useStore((state) => state.countTotalTokens);

  const [walletAddress, setWalletAddress] = useState('Qric...D5KD');
  const [solBalance, setSolBalance] = useState('0.00');
  const [solUsdValue, setSolUsdValue] = useState('0.00');
  const [meetBalance, setMeetBalance] = useState('0.00');
  const [meetUsdValue, setMeetUsdValue] = useState('0.00');
  const [maxApproval, setMaxApproval] = useState('1000');
  const [inputApproval, setInputApproval] = useState('');

  const handleConnectWallet = () => {
    alert('Connect Wallet button clicked');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Wallet address copied to clipboard');
  };

  const handleSetApproval = () => {
    setMaxApproval(inputApproval);
    alert(`Max approval set to: ${inputApproval}`);
  };

  return (
    <>
      <CollapseOptions />
      <div className={`${hideMenuOptions ? 'max-h-0' : 'max-h-full'} overflow-hidden transition-all`}>

        <div className="py-2">
          <button className='btn-primary w-full' onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        </div>

        <div className="bg-gray-800 p-2 rounded-md flex items-center gap-2 mb-2">
          <div className="bg-purple-600 p-1 rounded-full text-white flex items-center justify-center">
            <PersonIcon />
          </div>
          <div className="flex-1">
            <div className="text-white text-xs">Me</div>
            <div className="text-gray-500 text-xs cursor-pointer" onClick={handleCopyAddress}>
              {walletAddress}
            </div>
          </div>
          <SettingsMenu />
        </div>

        <div className="bg-gray-800 p-2 rounded-md mb-2">
          <div className="flex items-center gap-2">
            <img src={solLogoUrl} alt="SOL Logo" className="w-4 h-4" />
            <div className="flex-1">
              <div className="text-white text-xs">{solBalance} $SOL</div>
              <div className="text-gray-500 text-xs">${solUsdValue}</div>
            </div>
            <a href="https://jup.ag" target="_blank" rel="noopener noreferrer">
              <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <img src={meetLogoUrl} alt="MEET Logo" className="w-4 h-4" />
            <div className="flex-1">
              <div className="text-white text-xs">{meetBalance} $MEET</div>
              <div className="text-gray-500 text-xs">${meetUsdValue}</div>
              <div className="text-gray-500 text-xs">1 $MEET = 200,000 API Token</div>
            </div>
            <a href="https://jup.ag" target="_blank" rel="noopener noreferrer">
              <svg className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="bg-gray-800 p-2 rounded-md mb-2">
          <div className="flex items-center text-white text-xs mb-1 space-x-4">
            <div>Approved: <span className="text-purple-500 font-bold">{maxApproval}</span></div>
            <div>Used: <span className="text-purple-500 font-bold">{maxApproval}</span></div>
            <div>Left: <span className="text-purple-500 font-bold">{maxApproval}</span></div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="number"
              className="text-gray-800 dark:text-white p-2 text-xs bg-transparent disabled:opacity-40 disabled:cursor-not-allowed transition-opacity m-0 w-full h-full focus:outline-none rounded border border-white/20"
              value={inputApproval}
              onChange={(e) => setInputApproval(e.target.value)}
            />
            <button className="btn-primary" onClick={handleSetApproval}>
              Set Approval
            </button>
          </div>
        </div>

        {countTotalTokens && <TotalTokenCostDisplay />}
        {googleClientId && <GoogleSync clientId={googleClientId} />}

      </div>
    </>
  );
};

export default MenuOptions;
