import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const QueueAPIClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 3000,
})


function useQueueAPIClient(){
  const { getAccessTokenSilently } = useAuth0()
  QueueAPIClient.interceptors.request.use(async (config)=>{
    let token = await getAccessTokenSilently()
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
  return QueueAPIClient
}


export default useQueueAPIClient