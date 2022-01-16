import useCache from "./useCache"

export default function Problem(props: any){
  var fetch2 = useCache(fetchData, "test2");

  async function fetchData() {
    const data = await fetch("//127.0.0.1:3002/getMessage");
    const d = await data.json();
    console.log(d);
    return d;
  }
  console.log(fetch2(2));
  console.log(fetch2(2));
  console.log(fetch2(2));
  console.log(fetch2(2));
  console.log(fetch2(2));
  console.log(fetch2(2));


  return (
    <div>
      aabbccdd
    </div>
  )
}