function cancelTimer(id){
  window.cancelAnimationFrame(id)
}

function requestSetTimeOut(callBack,delay,callObj){
  let start;
  let id;
  Promise.resolve().then(() => {
    start = Date.now();
  });
  const timer = () => {
    if(Date.now() - start >= delay){
      callBack.call();
    }else{
      id = window.requestAnimationFrame(timer);
    }
  }
  return id
}

export {
  cancelTimer,
  requestSetTimeOut
}