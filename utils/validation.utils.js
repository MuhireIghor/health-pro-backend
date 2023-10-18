const recordValidator = (payload)=>{
    const {heartRate,bodyTemp,patientId} = payload;
    let isTempValid;
    let isheartRateValid;
    if(bodyTemp>=35 && bodyTemp<=40){
        isTempValid=true;
    }
    else{
        isTempValid = false;
    }
    if(heartRate>=60 && heartRate<=80){
        isheartRateValid=true;
    }
    else{
        isheartRateValid = false
    }
    return isTempValid && isheartRateValid;
}
module.exports = recordValidator;