//import {useContext} from 'react';
import axios from './axios';
import { _alert } from './index';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
// import {observer} from 'mobx-react-lite';
// import {StoreContext} from '../store';

export const getPostHeader = async (isFormData) => {
    try {
        const defaultHeader = {
            'Content-Type': (isFormData) ? 'multipart/form-data' : 'application/json',
            'device': (Platform.OS == 'ios') ? 'ios' : 'android',
        };
        const user_token = await AsyncStorage.getItem('user_token');
        if (user_token !== null) {
            return {
                'token': user_token,
                ...defaultHeader,
            };
        }
        return defaultHeader;
    } catch (error) {
        console.log({ error });
        return defaultHeader;
    }
};
export const put = async (data, endpoint) => {
    let request;
    const isFormData = data instanceof FormData;
    try {
        const requestBody = {
            url: endpoint,
            method: 'put',
            data: data,
            headers: await getPostHeader(isFormData),
        };
        console.log('body ', requestBody);
        const result = await axios(requestBody);
        console.log('result. ', result.data);

        if (result.data.success) {
            return { 'status': true, 'data': result.data };
        } else {
            return { 'status': false, 'message': result.data.error, 'data': [] };
        }

    } catch (error) {
        console.log(error.response);
        return { 'status': false, 'message': 'something went wrong', 'data': [] };
    }
};
export const dalete = async (data, endpoint) => {
    let request;
    const isFormData = data instanceof FormData;
    try {
        const requestBody = {
            url: endpoint,
            method: 'delete',
            data: data,
            headers: await getPostHeader(isFormData),
        };
        console.log('body ', requestBody);
        const result = await axios(requestBody);
        console.log('result. ', result);

        if (result.data.success) {
            return { 'status': true, 'data': result.data };
        } else {
            return { 'status': false, 'message': result.data.error, 'data': [] };
        }

    } catch (error) {
        console.log(error.response);
        return { 'status': false, 'message': 'something went wrong', 'data': [] };
    }
};
export const post = async (data, endpoint) => {
    let request;
    const isFormData = data instanceof FormData;
    try {
        const requestBody = {
            url: endpoint,
            method: 'post',
            data: data,
            headers: await getPostHeader(isFormData),
        };
        console.log('body ', requestBody);
        const result = await axios(requestBody);
        //console.log('result. ', result);

        if (result.data.success) {
            return { 'status': true, 'data': result.data };
        } else {
            return { 'status': false, 'message': result.data.error, 'data': [] };
        }

    } catch (error) {
        console.log(error.response);
        return { 'status': false, 'message': 'something went wrong', 'data': [] };
    }
};
export const get = async (endpoint) => {
    let request;
    try {
        const requestBody = {
            url: endpoint,
            method: 'get',
            headers: await getPostHeader(false),
        };
        console.log('requestBody ', requestBody);
        const result = await axios(requestBody);
        // console.log('result ', result.data);

        if (result.data.success) {
            return { 'success': true, 'data': result.data };
        }
        else {
            return { 'success': true, 'data': result.data };
        }
        // else {
        //     if (result.data.error == 'Invalid Credentials') {
        //        // AsyncStorage.removeItem('user');
        //        // useNavigation.navigate('Login');
        //         return {'status': false, 'message': 'Invalid Credentials1', 'data': []};
        //     } else {
        //         return {'status': false, 'message': result.data.error, 'data': []};
        //     }

        // }

    } catch (error) {
        console.log(error);
        return { 'status': false, 'message': 'Invalid Credentials', 'data': [] };
    }
};
