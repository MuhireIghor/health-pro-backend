const responseHandler = ({ res, er, message, result }) => {
    if (!res || er) {
    
      return res.json({
        isSuccessfull: false,
        success: false,
        message: message || "internal server error",
        result: null,
      });
    }

    return res.json({
      isSuccessfull: true,
      success: true,
    message: message || "Success",
      result: result,
    });
  };
  
  module.exports =  responseHandler;
  