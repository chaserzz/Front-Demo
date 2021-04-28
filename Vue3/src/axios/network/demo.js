import require from "./require"

export const demoApi = {
  getDemoJson: () => 
    require({
      url: "/demo.json",
    })
}