
import { Toast } from 'vant';
import {apis,baseUrl } from "./httpApi"

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        console.log("fetch女生经常就是111,",data.fileType)
        let headers = {}
        let requestConfig = {}
        if(data.fileType == 1){   
            headers = {
                //  "Content-Type": "multipart/form-data",
                'Content-Type': 'multipart/form-data',
                // "Accept": "*/*",
                // 'Accept': 'text/plain',
                //  'Process-Data': false ,    // 不处理数据
                //  'Content-Type': false,    // 不设置内容类型
            }
             requestConfig = {
                credentials: 'include',
                method: type,
                headers:headers,
                mode: "cors",
                cache: "force-cache"
            }
        }else{
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            requestConfig = {
                credentials: 'include',
                method: type,
                headers:headers,
                mode: "cors",
                cache: "force-cache"
            }
        }
    

        if (type == 'POST') {
            console.log("fetch女生经常就是222,",JSON.stringify(data))
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        console.log("fetch女生经常就是333,",data)
        
        try {
            console.log("fetch女生经常就是444,",data)
            const response = await fetch(url, requestConfig);
            const responseJson = await response.json();
            console.log("fetch女生经常就是555,",data,responseJson)
            return responseJson
        } catch (error) {
            throw new Error(error)
        }
    } else {  // 如果浏览器不支持fetch
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data);
            }

            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            requestObj.send(sendData);

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                    }
                }
            }
        })
    }
}
// export default async(url = '', data = {}, type = 'POST', method = 'fetch') => {
// 	console.log("type,",type)
//     type = type.toUpperCase();
//     url = baseUrl + url;

//     if (type == 'GET') {
//         let dataStr = ''; //数据拼接字符串
//         Object.keys(data).forEach(key => {
//             dataStr += key + '=' + data[key] + '&';
//         })

//         if (dataStr !== '') {
//             dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
//             url = url + '?' + dataStr;
//         }
//     }

//     if (window.fetch && method == 'fetch') {
//         let requestConfig = {
//             // credentials: 'include',
//             method: type,
//             headers: {
//                 // 'Accept': 'application/json',
// 				// 'Content-Type': 'application/json',
// 				'Content-Type': 'application/json',
// 				// withCredentials: false
//                 // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',

//             },
//             mode: "no-cors",
// 			cache: "force-cache",
// 			withCredentials: false
//         }

//         if (type == 'POST') {
// 			console.log("post,data1111,",data)
//             Object.defineProperty(requestConfig, 'body', {
//                 value: JSON.stringify(data)
//             })
//         }

//         try {
//             var response = await fetch(url, requestConfig);
//             var responseJson = await response.json();
//         } catch (error) {
//             throw new Error(error)
//         }
//         return responseJson
//     } else {
//         let requestObj;
//         if (window.XMLHttpRequest) {
//             requestObj = new XMLHttpRequest();
//         } else {
//             requestObj = new ActiveXObject;
//         }

//         let sendData = '';
//         if (type == 'POST') {
// 			console.log("post,data222,",data)
//             sendData = JSON.stringify(data);
//         }

//         requestObj.open(type, url, true);
//         requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//         requestObj.send(sendData);

//         requestObj.onreadystatechange = () => {
//             if (requestObj.readyState == 4) {
//                 if (requestObj.status == 200) {
//                     let obj = requestObj.response
//                     if (typeof obj !== 'object') {
//                         obj = JSON.parse(obj);
//                     }
//                     return obj
//                 } else {
//                     throw new Error(requestObj)
//                 }
//             }
//         }
// 	}
// }
