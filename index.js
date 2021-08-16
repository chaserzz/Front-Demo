function enhanceUser (WrapperComponent){
  return <Usercontext.Consumer>
    {
      value => {
        return <WrapperComponent {...props} user={...value}/>

      }
    }
  </Usercontext.Consumer>
}