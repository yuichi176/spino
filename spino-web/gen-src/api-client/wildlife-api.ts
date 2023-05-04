/* tslint:disable */
/* eslint-disable */
/**
 * Today\'s Wildlife API
 * API for Today\'s Wildlife application
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { WildlifeInfo } from '../types';
/**
 * WildlifeApi - axios parameter creator
 * @export
 */
export const WildlifeApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary get wildlife information
         * @param {string} [date] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWildlife: async (date?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/wildlifes`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (date !== undefined) {
                localVarQueryParameter['date'] = date;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * WildlifeApi - functional programming interface
 * @export
 */
export const WildlifeApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = WildlifeApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary get wildlife information
         * @param {string} [date] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getWildlife(date?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<WildlifeInfo>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getWildlife(date, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * WildlifeApi - factory interface
 * @export
 */
export const WildlifeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = WildlifeApiFp(configuration)
    return {
        /**
         * 
         * @summary get wildlife information
         * @param {string} [date] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWildlife(date?: string, options?: any): AxiosPromise<WildlifeInfo> {
            return localVarFp.getWildlife(date, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * WildlifeApi - object-oriented interface
 * @export
 * @class WildlifeApi
 * @extends {BaseAPI}
 */
export class WildlifeApi extends BaseAPI {
    /**
     * 
     * @summary get wildlife information
     * @param {string} [date] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WildlifeApi
     */
    public getWildlife(date?: string, options?: AxiosRequestConfig) {
        return WildlifeApiFp(this.configuration).getWildlife(date, options).then((request) => request(this.axios, this.basePath));
    }
}
