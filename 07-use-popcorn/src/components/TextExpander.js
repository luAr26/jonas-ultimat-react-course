/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";

const getWordsFromParagraph = (paragraph, numWords) => {
  const words = paragraph.split(" ");
  return `${words.slice(0, numWords).join(" ")}...`;
};

const TextExpander = ({
  children,
  collapsedNumWords = 10,
  expandedButtonText = "Show text",
  collapseButtonText = "Show less",
  buttonColor = "blue",
  isExpanded = false,
  className = "",
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  if (typeof children !== "string") return;

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const buttonStyle = {
    display: "inline-block",
    color: buttonColor,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "inherit",
  };

  return (
    <div className={className}>
      {!expanded && (
        <p>
          {getWordsFromParagraph(children, collapsedNumWords)}{" "}
          <button onClick={handleExpand} style={buttonStyle}>
            {expanded ? collapseButtonText : expandedButtonText}
          </button>
        </p>
      )}
      {expanded && (
        <p>
          {children}{" "}
          <button onClick={handleExpand} style={buttonStyle}>
            {expanded ? collapseButtonText : expandedButtonText}
          </button>
        </p>
      )}
    </div>
  );
};

TextExpander.propTypes = {
  children: PropTypes.string.isRequired,
  collapsedNumWords: PropTypes.number,
  expandedButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  isExpanded: PropTypes.bool,
  className: PropTypes.string,
};

export default TextExpander;
