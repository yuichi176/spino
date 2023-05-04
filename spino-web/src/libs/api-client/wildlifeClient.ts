import { env } from '@/config/env'
import axios from "axios";
import {Configuration, WildlifeApi} from "../../../gen-src";

const beURL = `${env.BE_PROTOCOL}://${env.BE_BASE_DOMAIN}/openapi`

const config = new Configuration({
    basePath: beURL
})

const axiosInstance = axios.create({
    baseURL: beURL,
    headers: {'Content-Type': 'application/json'}
})

export const wildlifeClient = new WildlifeApi(config, '', axiosInstance)
