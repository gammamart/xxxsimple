import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { BsFillCheckCircleFill, BsArrowRight } from "react-icons/bs";
import Banner1 from "@/public/statics/images/banner1";
import Banner2 from "@/public/statics/images/banner2";

const Body = ({ noShell = false }) => {
  const [updateTimes, setUpdateTimes] = useState({});

  // Generate stable random times for each country
  useEffect(() => {
    const generateRandomTime = (seed) => {
      // Use a simple hash function to create a stable seed
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
      }

      // Use the hash as seed for Math.random-like behavior
      const random = Math.abs(hash) / 2147483647; // Normalize to 0-1

      // Generate time between 1-24 hours ago
      const hoursAgo = Math.floor(random * 24) + 1;
      const minutesAgo = Math.floor(random * 60);

      const now = new Date();
      const pastTime = new Date(now.getTime() - (hoursAgo * 60 + minutesAgo) * 60 * 1000);

      return pastTime;
    };

    const countries = ["United States", "United Kingdom", "Canada", "India", "Germany", "France", "Spain", "Italy", "Netherlands", "Australia", "Brazil", "Mexico"];
    const times = {};

    countries.forEach((country) => {
      times[country] = generateRandomTime(country + new Date().toDateString());
    });

    setUpdateTimes(times);
  }, []);

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m ago`;
    } else {
      return `${diffMinutes}m ago`;
    }
  };

  const Inner = (
    <>
      <SideMenu className="vintage-sidemenu">
        <h3>Account Menu</h3>
        <Link href="/getIn">Member Login</Link>
        <Link href="/register">Create Account</Link>
        <Link href="/dashboard">My Accounts</Link>
        <Link href="/dashboard/fund-wallet">Deposit</Link>
        <Link href="/dashboard/history">History</Link>
        <Link href="/contact">Support</Link>
      </SideMenu>
      <MainArea>
        <Tabs className="vintage-tabs">
          <Tab className="vintage-tab active">Overview</Tab>
        </Tabs>
        <Panels>
          <Panel className="vintage-panel">
            <Headline>Предоставление прямой услуги</Headline>
            <Sub>
              <BsFillCheckCircleFill size={16} color="#2a5a1b" /> мы легенда в сфере услуг, которые мы предоставляем.
            </Sub>
            <Actions>
              <ActionLink href={"/getIn"} className="vintage-button">
                Login <BsArrowRight size={14} />
              </ActionLink>
              <ActionLink href={"/register"} className="vintage-button">
                Create account <BsArrowRight size={14} />
              </ActionLink>
            </Actions>
          </Panel>
          <Panel className="vintage-panel">
            <TableTitle>SMS Country Prices</TableTitle>
            <RatesTable>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Network</th>
                  <th>Price/SMS</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>United States</td>
                  <td>AT&T / Verizon / T‑Mobile / Sprint / US Cellular / Cricket / Metro / Boost / Visible / Mint</td>
                  <td>$0.02</td>
                  <td>{updateTimes["United States"] ? formatTime(updateTimes["United States"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>United Kingdom</td>
                  <td>O2 / Vodafone / EE / Three</td>
                  <td>£0.018</td>
                  <td>{updateTimes["United Kingdom"] ? formatTime(updateTimes["United Kingdom"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>Canada</td>
                  <td>Rogers / Bell / Telus / Freedom</td>
                  <td>$0.021</td>
                  <td>{updateTimes["Canada"] ? formatTime(updateTimes["Canada"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>India</td>
                  <td>Jio / Airtel / Vi / BSNL</td>
                  <td>₹0.90</td>
                  <td>{updateTimes["India"] ? formatTime(updateTimes["India"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>Germany</td>
                  <td>T‑Mobile / Vodafone / O2 / 1&1</td>
                  <td>€0.015</td>
                  <td>{updateTimes["Germany"] ? formatTime(updateTimes["Germany"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>France</td>
                  <td>Orange / SFR / Bouygues / Free</td>
                  <td>€0.016</td>
                  <td>{updateTimes["France"] ? formatTime(updateTimes["France"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>Spain</td>
                  <td>Movistar / Vodafone / Orange / Yoigo</td>
                  <td>€0.017</td>
                  <td>{updateTimes["Spain"] ? formatTime(updateTimes["Spain"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>Italy</td>
                  <td>Tim / Vodafone / Wind Tre / Iliad</td>
                  <td>€0.018</td>
                  <td>{updateTimes["Italy"] ? formatTime(updateTimes["Italy"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>Netherlands</td>
                  <td>KPN / Vodafone / T‑Mobile / Tele2</td>
                  <td>€0.014</td>
                  <td>{updateTimes["Netherlands"] ? formatTime(updateTimes["Netherlands"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>Australia</td>
                  <td>Telstra / Optus / Vodafone / TPG</td>
                  <td>A$0.025</td>
                  <td>{updateTimes["Australia"] ? formatTime(updateTimes["Australia"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>Brazil</td>
                  <td>Vivo / Claro / TIM / Oi</td>
                  <td>R$0.08</td>
                  <td>{updateTimes["Brazil"] ? formatTime(updateTimes["Brazil"]) : "Loading..."}</td>
                </tr>
                <tr>
                  <td>Mexico</td>
                  <td>Telcel / Movistar / AT&T / Unefon</td>
                  <td>$0.35</td>
                  <td>{updateTimes["Mexico"] ? formatTime(updateTimes["Mexico"]) : "Loading..."}</td>
                </tr>
              </tbody>
            </RatesTable>
          </Panel>
        </Panels>
      </MainArea>
    </>
  );

  if (noShell) {
    return Inner;
  }

  return <Shell>{Inner}</Shell>;
};

const Shell = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  min-height: 520px;
  background: linear-gradient(180deg, #f8f7f3 0%, #efede6 100%);
  border: 1px solid #c5c3bb;
  box-shadow: 0 2px 0 #fff inset, 0 1px 0 #bab6ad inset, 0 8px 18px rgba(0, 0, 0, 0.35);
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
    min-height: auto;
  }
`;
const SideMenu = styled.div`
  width: 260px;
  padding: 12px;
  border-right: 1px solid #bdb9ad;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #bdb9ad;
    padding: 8px;
  }

  & h3 {
    margin: -12px -12px 8px -12px; /* stretch header to menu edges */
    padding: 10px 12px;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #213a60;
    background: linear-gradient(180deg, #dcd8cc 0%, #cfcabf 100%);
    border-bottom: 1px solid #b7b2a6;

    @media (max-width: 768px) {
      margin: -8px -8px 6px -8px;
      padding: 8px;
      font-size: 11px;
    }
  }

  & a {
    display: block;
    padding: 10px 12px;
    color: #2c2c2c;
    text-decoration: none;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 12px;
    background: linear-gradient(180deg, #f7f5ef 0%, #ece9df 100%);
    border: 1px solid #d5d1c7;
    border-radius: 2px;
    box-shadow: 0 1px 0 #fff inset;

    @media (max-width: 768px) {
      padding: 8px 10px;
      font-size: 11px;
    }
  }

  & a:hover {
    background: linear-gradient(180deg, #edeae1 0%, #e5e1d7 100%);
    text-decoration: underline;
  }
`;
const MainArea = styled.div`
  flex: 1;
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;
const Tabs = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;
`;
const Tab = styled.div``;
const Panels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
`;
const Panel = styled.div``;
const Headline = styled.h1`
  font-family: "Times New Roman", Times, Georgia, "Book Antiqua", serif;
  font-size: 28px;
  color: #1e2c45;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
const Sub = styled.p`
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #2d2d2d;
`;
const Actions = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 22px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }
`;
const ActionLink = styled(Link)`
  text-decoration: underline;
  font-size: 14px;
`;
const TableTitle = styled.h3`
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #213a60;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #bdb9ad;
`;
const RatesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: 12px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }

  & th {
    text-align: left;
    background: linear-gradient(180deg, #d9d5cb 0%, #c9c4b8 100%);
    color: #1f2f4b;
    padding: 10px;
    border: 1px solid #bdb9ad;

    @media (max-width: 768px) {
      padding: 8px 6px;
    }

    @media (max-width: 480px) {
      padding: 6px 4px;
    }
  }
  & td {
    padding: 10px;
    border: 1px solid #d5d1c7;
    background: #fbfaf6;

    @media (max-width: 768px) {
      padding: 8px 6px;
    }

    @media (max-width: 480px) {
      padding: 6px 4px;
    }
  }
  & tr:nth-child(even) td {
    background: #f2f0ea;
  }
`;

export default Body;
