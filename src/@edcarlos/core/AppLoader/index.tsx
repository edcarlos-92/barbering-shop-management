import React from "react";
import { Loading } from "@nextui-org/react";

const AppLoader = () => {
  return (
    <div className="app-loader">
      <div className="loader-spin">
        <Loading size="xl" />
        {/* <span className="edcarlos-dot edcarlos-dot-spin">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>  */}
      </div>
    </div>
    // <div className='grid place-items-center h-screen' ><Loading size="xl">Loading...</Loading> </div>


  );
};

export default AppLoader;
