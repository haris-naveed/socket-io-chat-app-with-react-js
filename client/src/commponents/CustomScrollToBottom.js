import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const CustomScrollToBottom = ({
  children,
  className = "message-container",
}) => {
  return <ScrollToBottom className={className}>{children}</ScrollToBottom>;
};

export default CustomScrollToBottom;
