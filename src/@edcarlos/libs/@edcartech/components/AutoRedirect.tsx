
import React, { useEffect } from 'react'



export function AutoRedirect(props:any) {

    const redirect = useEffect(() => {

    if(props.Active == true){
       setTimeout(function(){
            window.location.href = props.URL;
        }, props.Seconds * 1000);
    }

      }, []);
    
    return (
        <>     
        {redirect}
        </>
    )
}


/*
export default function Redirect(props:any){
    // Your application has indicated there's an error
    window.setTimeout(function(){
        // Move to a new location or you can do something else
        window.location.href = props.URL;
    }, props.timeSeconds);


    /*
    if(props.error == true){

        // Your application has indicated there's an error
        window.setTimeout(function(){
    
            // Move to a new location or you can do something else
            window.location.href = "https://www.google.co.in";
    
        }, 5000);
    
    }
   

}

*/
