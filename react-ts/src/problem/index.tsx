import React,{useCallback, useEffect, useState}from 'react'

const json = {
  json1:  [
   ["红色",  "黄色",  "蓝色"],
   ["S",  "M"],
   ["棉的",  "涤纶"],
  ],
  json2:  [
   {
    color:  "红色",
    type:  "S",
    mianliao:  "棉的",
    price:  100,
   },
   {
    color:  "红色",
    type:  "M",
    mianliao:  "棉的",
    price:  200,
   },
   {
    color:  "红色",
    type:  "S",
    mianliao:  "涤纶",
    price:  300,
   },
   {
    color:  "红色",
    type:  "M",
    mianliao:  "涤纶",
    price:  400,
   },
   {
    color:  "黄色",
    type:  "S",
    mianliao:  "棉的",
    price:  500,
   },
   {
    color:  "黄色",
    type:  "M",
    mianliao:  "棉的",
    price:  600,
   },
   {
    color:  "黄色",
    type:  "S",
    mianliao:  "涤纶",
    price:  700,
   },
   {
    color:  "黄色",
    type:  "M",
    mianliao:  "涤纶",
    price:  800,
   },
   {
    color:  "蓝色",
    type:  "S",
    mianliao:  "棉的",
    price:  900,
   },
   {
    color:  "蓝色",
    type:  "M",
    mianliao:  "棉的",
    price:  1000,
   },
   {
    color:  "蓝色",
    type:  "S",
    mianliao:  "涤纶",
    price:  1100,
   },

  ]
}

function getValueByOptions(selectedOptions){
  return json.json2.find(({color,type,mianliao}) => {
    const goodFields = [color,type,mianliao].sort();
    const options = selectedOptions.map(item => item).sort() 
    for(let i = 0; i < options.length; i++ ){
      if(goodFields[i] !== options[i]) return false;
    }
    return true
  });
}


function judgeIsDisabled(option,indicator,selectedOptions){
  const goodsItem = selectedOptions.map((item,index) => index === indicator ? option : item);
  console.log('goodsItem',goodsItem);
  return !getValueByOptions(goodsItem)
}

export default function Problem (props: any){
  const [checkedItem, setCheckedItem] = useState<any>({});
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const handleOptionChangeByIndicator = useCallback(function handleOptionChangeByIndicator(value,indicator){
    const newOptions = selectedOptions.map((val,index) => {
      if(index === indicator) return value;
      return val;
    });
    setCheckedItem(getValueByOptions(newOptions) as any);
    setSelectedOptions(newOptions);
  },[selectedOptions])

  useEffect(() => {
    const selectedOptions = json.json1.reduce((selectedOptions,optionArray) => {
      selectedOptions.push(optionArray[0]); 
      return selectedOptions;
    },[]);
    const goods = getValueByOptions(selectedOptions)
    setCheckedItem(goods);
    setSelectedOptions(selectedOptions);
  },[]);
  return (
    <>
      {json.json1.map((options,index) => <Options selectedOptions={selectedOptions} options={options} indicator={index} handleChosenTypeChange={handleOptionChangeByIndicator} key={index}/>)}
      <p>
        {
          `颜色:${checkedItem.color},大小:${checkedItem.type},面料:${checkedItem.mianliao},金额:${checkedItem.price}`
        }
      </p>
    </>
  )
}  

function Options({options,indicator,handleChosenTypeChange,selectedOptions}){
  const [checkedOption, setCheckedOption] = useState(0);

  function handleOptionChecked(e:any,index){
    setCheckedOption(index);
    handleChosenTypeChange(e.target.value,indicator)
  }

  return (
    <p>
      {options.map((option,index) => (<button disabled={judgeIsDisabled(option,indicator,selectedOptions)} 
                                              style={checkedOption === index ? {color: 'red'}: {}} 
                                              onClick={(e: any) => {handleOptionChecked(e,index)}} 
                                              value={option} 
                                              key={index}>{option}</button>))}
    </p>
  )
}