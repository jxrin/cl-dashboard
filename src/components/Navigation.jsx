import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Pages } from "./pages/pages.js";
import styled from "styled-components";
import Logo from "../assets/logo2.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  background: #fefefe;
`;

const MainContainer = styled.div`
  padding-left: 33vh;
  margin-top: 14vh;
  width: 80%;
  position: absolute;
  border: 1px solid red;
`;

const TodayDate = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #a7b0bc;
  text-align: right;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 900;
  padding-right: 10px;
  padding-top: 10px;
  background: #fefefe;
`;

const NavWrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  height: 84.5vh;
  width: 25vh;
  justify-content: space-evenly;
  padding-left: 40px;
  padding-top: 40px;
  bottom: 0;
  background: #97AEF4;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 800
  font-size: 1em;
  border-radius: 0px 36px 0px 0px;
`;

const IconImage = styled.img`
  display: "flex",
  alignItems: "left"
  max-width: 100px;
  max-height: 100px;
`;

const ImgContainer = styled.div`
  display: "flex",
  max-width: 50px;
  max-height: 50px;
`;

// Date settings
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};
let d = new Date();

const PageLink = props => {
  return (
    <div>
      <a
        rel="noopener noreferrer"
        href={props.site}
        style={{ paddingLeft: 13, textDecoration: "none" }}
        onClick={e => props.newPage(e, props.tag)}
      >
        <i className="navlink">{props.tag}</i>
      </a>
    </div>
  );
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  newPage = (e, title) => {
    this.setState({
      title: title
    });
  };

  render() {
    return (
      <>
        <TodayDate>{d.toLocaleDateString("en-US", options)}</TodayDate>
        <Container>
          <div>
            {/* Routing for navigation bar  */}
            <NavWrapper>
              <ImgContainer>
                <IconImage src={Logo} />
              </ImgContainer>
              {/* Nav side bar  */}
              <PageLink
                site={"/overview"}
                tag={"Overview"}
                newPage={this.newPage}
              />
              <PageLink
                site={"/daily-tasks"}
                tag={"Daily Tasks"}
                newPage={this.newPage}
              />
              <PageLink
                site={"/self-evaluation"}
                tag={"Self Evaluation"}
                newPage={this.newPage}
              />
              <PageLink site={"/goals"} tag={"Goals"} newPage={this.newPage} />
              <PageLink
                site={"/resources"}
                tag={"Resources"}
                newPage={this.newPage}
              />
            </NavWrapper>
            <Router>
              <h1>{this.state.title}</h1>

              {Pages.map(page => {
                return (
                  <MainContainer>
                    <Route
                      key={page.page}
                      path={page.path}
                      component={page.page}
                    />
                  </MainContainer>
                );
              })}
            </Router>
          </div>
          {/* <List></List> */}
        </Container>
      </>
    );
  }
}

export default Navigation;