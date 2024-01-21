/* eslint-disable no-unused-vars */
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Signin from "./pages/SignIn";
import Activity from "./pages/activity";
import Schedule from "./pages/schedule";
import Orders from "./pages/orders";
import '@rainbow-me/rainbowkit/styles.css';
import { Navigate } from "react-router-dom";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  // mainnet,
  sepolia,
  // polygonZkEvmTestnet,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Members from "./pages/members";
import GlobalProvider from "./context/GlobalContext";
import MonthMember from "./pages/monthmember";
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import Payout from "./pages/payout";
import Attendance from "./pages/attendance";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignAttendance from "./pages/signAttendance";
import MemberVault from "./pages/memberVault";
import MemberLoan from "./pages/memberLoan";

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: `https://eth-sepolia.g.alchemy.com/v2/PN7ox_cWivKpFnRnE5YKoJ5Vyp8-Bx5j` }),
    publicProvider()
  ]
);

const client = new Client({
  url: 'https://api.studio.thegraph.com/query/52398/payclick/version/latest',
  exchanges: [cacheExchange, fetchExchange],
});

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

function App() {

  return (
    <GlobalProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Provider value={client}>
            <BrowserRouter>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/members" element={<Members />} />
                <Route path="/payouts" element={<Payout />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/signAttendance/:addr" element={<SignAttendance />} />
                <Route path="/member_vault/:addr" element={<MemberVault />} />
                <Route path="/member_loan/:addr" element={<MemberLoan />} />
                <Route path="/members/monthly_winner" element={<MonthMember />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/" element={<Signin />} />
              </Routes>
            </BrowserRouter>
            <ToastContainer />
          </Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </GlobalProvider>
  );
}
export default App
