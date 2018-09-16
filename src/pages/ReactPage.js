import React, { Component } from "react";
import axios from "axios";
import "./ReactPage.css";

/**
 * Components
 */
import {
  LineLoader,
  CodeBlock,
  PlusMinus,
  AmazingPlaceholder,
  SearchWithHighlight,
  PopupSelect,
  GlowingText
} from "../components";

/**
 * Showcase (Components that need states)
 */
import {
  ButtonGroupShowCase,
  ErrorSnippetShowCase,
  SelectableButtonShowCase
} from "./showcase";

const componentArray = [
  {
    name: "GlowingText",
    component: <GlowingText text="[ District Zero ] " />,
    description: "Welcome to Districk Zero",
    createDate: "Sep 16, 2017"
  },
  {
    name: "PopupSelect",
    component: <PopupSelect />,
    description: "ideas from: https://uimovement.com/ui/5879/active/",
    createDate: "Sep 14, 2017"
  },
  {
    name: "SearchWithHighlight",
    component: <SearchWithHighlight />,
    description: "Where are your from?",
    createDate: "Sep 8, 2017"
  },
  {
    name: "SelectableButton",
    component: <SelectableButtonShowCase />,
    description: "four, five, six",
    createDate: "Sep 7, 2018"
  },
  {
    name: "AmazingPlaceholder",
    component: <AmazingPlaceholder />,
    description: "Get out of the way ! placeholder",
    createDate: "Sep 6, 2018"
  },
  {
    name: "ErrorSnippet",
    component: <ErrorSnippetShowCase />,
    description: "Opps, what's wrong?",
    createDate: "Sep 5, 2018"
  },
  {
    name: "ButtonGroup",
    component: <ButtonGroupShowCase />,
    description: "Yea, life is hard bro",
    createDate: "Sep 4, 2018"
  },
  {
    name: "PlusMinus",
    component: <PlusMinus />,
    description: "Life needs a little spin",
    createDate: "Sep 3, 2018"
  },
  {
    name: "LineLoader",
    component: <LineLoader />,
    description: "left, right, left....",
    createDate: "Aug 30, 2018"
  }
];

class ReactPage extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    const filePaths = componentArray.reduce((acc, cv) => {
      const { name } = cv;
      const js = `${name}.js.txt`;
      const css = `${name}.css.txt`;
      return acc.concat([js, css]);
    }, []);

    filePaths.map(path => {
      axios
        .get(`./rawCode/${path}`)
        .then(res => {
          const { data } = this.state;
          data[path] = res.data;
          this.setState({ data });
          return null;
        })
        .catch(e => {
          console.log(e);
        });
      return null;
    });
  }

  renderComponentBlock = () => {
    const { data } = this.state;
    return componentArray.map(obj => {
      const { name, component, description } = obj;
      const js = `${name}.js.txt`;
      const css = `${name}.css.txt`;
      const jsString = data[js];
      const cssString = data[css];
      if (jsString && cssString) {
        return (
          <div className="RE-componentBlock" key={name}>
            <div className="RE-componentWrap">
              <h3 className="RE-componentName">{name}</h3>

              <div className="RE-actualComponent">{component}</div>

              <div className="RE-componentDescription">
                <p> - {description}</p>
              </div>
            </div>

            <div className="RE-codeBlock">
              <CodeBlock jsString={jsString} cssString={cssString} />
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <div className="RE-container">
        <h2 className="RE-title">Components that I built</h2>
        <hr />
        {this.renderComponentBlock()}
      </div>
    );
  }
}

export default ReactPage;
