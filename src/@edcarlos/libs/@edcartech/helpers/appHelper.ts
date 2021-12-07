var crypto_ = require('crypto');
var algorithm = 'aes192';
const jwt  = require('jsonwebtoken');

//JWT HELPERS

//function Helper(this:any){
	const jwtKey = 'my_secret_key';
	//this. = 
    function hasOwnProperty(obj:any,propertyName:any) {
        if(propertyName in obj){
            return true;
        }else{
            return false;
        }
    }
	//this. = 
    function createResponse(status:any,code:any,message:any,document:any){
        return {
            "status":status,
            "code":code,
            "message":message,
            "document":document
        };
    };
	//this. = 
    function encrypt(this:any,text:any){
        var cipher = crypto_.createCipher(algorithm,this.SECRET_KEY);
        var crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    };

    //this.= 
    function decrypt(this:any,text:any){
        var decipher = crypto_.createDecipher(algorithm,this.SECRET_KEY);
        var dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    };
	
	//this. = 
    // function hasOwnProperty(obj:any,propertyName:any) {
    //     if(propertyName in obj){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
	
	//this. = 

    let FullTokenid = '';
   export function fetchTokenid(){
        return FullTokenid
    }

    function checkPermission(this:any,req:any,action:any,_callback:any) {
        try{	
            console.log("Check Token Permission");
			 const token = this.extractToken(req); 
			 if (!token) {
			 //enable token check - uncomment below line
				return _callback(0);
			 }
			 var payload
			  try {
				// Parse the JWT string and store the result in `payload`.
				// Note that we are passing the key in this method as well. This method will throw an error
				// if the token is invalid (if it has expired according to the expiry time we set on sign in),
				// or if the signature does not match
				payload = jwt.verify(token, jwtKey)
				console.log("JWT Token data",payload);
                console.log("JWT Token data Payload ID",payload.id);
                FullTokenid = payload.id
			  } catch (e) {
			   //enable token check - uncomment below line
				return _callback(0);
			  }
		
			if(true){ 
			//put your own condition
				return _callback(1);
			}
			 else{
				   return _callback(0);
			 }
        }catch (ex) {
            console.error("Internal error:" + ex);
            return _callback(0);
        }
    };
	
	//this. = 
    function extractToken(req:any) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
	}

//}

//module.exports = Helper();
// Could be a functional component to export but needs to be called ie Helper.something
export default  {
    hasOwnProperty,
    createResponse,
    extractToken,
    checkPermission,
    encrypt,
    decrypt
}
