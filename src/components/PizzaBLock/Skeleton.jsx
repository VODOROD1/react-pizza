import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="9" cy="21" r="2" /> 
    <rect x="4" y="285" rx="10" ry="10" width="280" height="28" /> 
    <rect x="0" y="330" rx="10" ry="10" width="280" height="88" /> 
    <rect x="-1" y="445" rx="10" ry="10" width="95" height="27" /> 
    <circle cx="140" cy="140" r="130" /> 
    <rect x="125" y="435" rx="30" ry="30" width="155" height="45" />
  </ContentLoader>
)

export default Skeleton
