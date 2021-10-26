import React from 'react'
//Alert component for showing alert
function Alert(props) {
    const Capitalize=(text)=>{
        if(text==="danger")
        {
            text = "error"
        }
        let str = text.charAt(0).toUpperCase();
        return str + text.substring(1);
    }
    return (
        <div style={{height:'60px'}}>
            {/* If not Null the below operation in performed && for the and operator  */}
        {props.alert && <div>
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
   <strong>{Capitalize(props.alert.type)}: </strong>{props.alert.msg}
            </div>
        </div>}
    </div>
    )
}
// Here default export is allowed only once and can be added in funtion or outside the function
export default Alert



