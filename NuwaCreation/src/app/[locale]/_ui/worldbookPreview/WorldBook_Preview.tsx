"use client";
import React from "react";

import WorldBookPrev from "./WorldBook_Prev";
import { TypeWorldBook } from "../../_lib/definitions";

function WorldBook_Preview({worldBook}: {worldBook: TypeWorldBook | undefined}) {

  return (
    <div>   
        <WorldBookPrev isPreview={true} worldBooka={worldBook}/>
    </div>
  );
}

export default WorldBook_Preview;
