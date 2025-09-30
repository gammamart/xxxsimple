import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { BsFillCheckCircleFill, BsArrowRight } from "react-icons/bs";
import Banner1 from "@/public/statics/images/banner1";
import Banner2 from "@/public/statics/images/banner2";

const Body = ({ noShell = false }) => {
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
                  <td>AT&T / Verizon / T‑Mobile</td>
                  <td>$0.02</td>
                  <td>Today 12:00</td>
                </tr>
                <tr>
                  <td>United Kingdom</td>
                  <td>O2 / Vodafone / EE</td>
                  <td>£0.018</td>
                  <td>Today 12:00</td>
                </tr>
                <tr>
                  <td>Canada</td>
                  <td>Rogers / Bell / Telus</td>
                  <td>$0.021</td>
                  <td>Today 12:00</td>
                </tr>
                <tr>
                  <td>Nigeria</td>
                  <td>MTN / Glo / Airtel</td>
                  <td>₦15.00</td>
                  <td>Today 12:00</td>
                </tr>
                <tr>
                  <td>India</td>
                  <td>Jio / Airtel / Vi</td>
                  <td>₹0.90</td>
                  <td>Today 12:00</td>
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
  // border: 1px solid red;
  margin-top: 30px;
`;
const SideMenu = styled.div`
  width: 260px;
  padding: 12px;
  border-right: 1px solid #bdb9ad;
  display: flex;
  flex-direction: column;
  gap: 8px;

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
  }

  & a:hover {
    background: linear-gradient(180deg, #edeae1 0%, #e5e1d7 100%);
    text-decoration: underline;
  }
`;
const MainArea = styled.div`
  flex: 1;
  padding: 16px;
  
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

  & th {
    text-align: left;
    background: linear-gradient(180deg, #d9d5cb 0%, #c9c4b8 100%);
    color: #1f2f4b;
    padding: 10px;
    border: 1px solid #bdb9ad;
  }
  & td {
    padding: 10px;
    border: 1px solid #d5d1c7;
    background: #fbfaf6;
  }
  & tr:nth-child(even) td {
    background: #f2f0ea;
  }
`;

export default Body;
