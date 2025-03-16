
import {  Link, NavLink } from "react-router";

import { Box } from "@mui/system";

export default ()=>{

  return(
      <>
         <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        m: 2, 
      }}/>
      <Box sx={{   position: "absolute",
        top: 0,
        right: 0,
        m: 2,
      }}>
        
        <nav>

            <Link to="/HomePage">   Home   </Link>
            <Link to="/about">   About   </Link>
            <NavLink to='/rer'/>

        </nav>
      </Box>

        </>
    )
}