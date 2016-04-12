"use strict";

import 'babel-polyfill';

import Organization from './module/Organization';
import Company from './module/Company';
import Singleton from './module/Singleton';
import ApiConnector from './module/ApiConnector';
import Wait from './module/Wait';
import Chain from './module/Chain';
import Get from './module/Get';


const organization = new Organization('tongari');
console.log(organization.greet());
console.log('Organization name : ',organization.name);
organization.name = 'convert';
console.log( 'Convert is Organization name : ',organization.name );
console.log( 'Organization isClass : ' ,Organization.isOrganization( organization ) );
console.log( 'Organization age : ',organization.age );
console.log('----------------------------');

const company = new Company('tongari co ltd');
console.log(company.greet());
console.log('Company isInit : ' ,Company.isInit );
console.log('Company set isInit : ' ,Company.isInit = true );
console.log('Company isInit : ' ,Company.isInit );
console.log('----------------------------');


const singleton = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log( 'singleton : ',singleton );
console.log( 'singleton counter : ',singleton.counter );
console.log( 'singleton2: ',singleton );
console.log( 'singleton2 counter : ',singleton2.counter );



/*----------

Promise & Generator

------------*/



const YOUTUBE_API_KEY = 'your youtube api key';
const samsmithUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=samsmith`;
const zeddUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=zedd`;



const fetchPromise = ()=> {
    ApiConnector.instance.fetch(samsmithUrl)
        .then(res => {
            let data = JSON.parse(res);
            console.log('samsmith data : ',data);
            console.log('Wait start -> default millisecond');
            return new Wait();
        })
        .then(()=> ApiConnector.instance.fetch(zeddUrl)
            .then(res => {
                let data = JSON.parse(res);
                console.log('zedd data : ',data);
            }).catch(e => {
                console.error('error',e);
            })
        )
        .then(()=>{
            console.log('Wait start -> 3000');
            return new Wait(3000)
        })
        .catch(e => {
            console.error('error',e);
        });
};

//fetchPromise();

let externalData = {};

const chain = new Chain(function* () {

    console.log('chain start-------------------------');
    console.log( 'connect start -> samsmith' );

    yield ApiConnector.instance.fetch(samsmithUrl)
        .then( res => {
            let data = JSON.parse(res);
            externalData.samsmith = Object.assign({},data);
            // console.log(data);
            console.log( 'connect end -> samsmith' );
        });

    console.log( 'wait start -> 2000 millisecond' );
    yield new Wait(2000);

    console.log( 'wait start -> 1000 millisecond' );
    yield new Wait();

    console.log( 'connect start -> zedd' );

    yield new Get( zeddUrl ).then( res => {
        let data = JSON.parse(res);
        externalData.zedd = Object.assign({},data);
        // console.log(data);
        console.log( 'connect end -> zedd' );
    });

    console.log( 'wait start -> 3000 millisecond' );
    yield new Wait(3000);

    return console.log('chain end-------------------------');
});
const dispose = ()=>{

    setTimeout(()=> {
        console.log( externalData );
    },1000);

    this.chain = null;
};

// chain.execute();
// chain.onEnd = ( () => {
//     alert('chain end');
//     dispose();
// });


(async()=> {

    console.log('async start-------------------------');
    console.log( 'connect start -> samsmith' );

    await ApiConnector.instance.fetch(samsmithUrl)
        .then( res => {
            let data = JSON.parse(res);
            externalData.samsmith = Object.assign({},data);
            // console.log(data);
            console.log( 'connect end -> samsmith' );
        });

    console.log( 'wait start -> 2000 millisecond' );
    await new Wait(2000);

    console.log( 'wait start -> 1000 millisecond' );
    await new Wait();

    console.log( 'connect start -> zedd' );

    await new Get( zeddUrl ).then( res => {
        let data = JSON.parse(res);
        externalData.zedd = Object.assign({},data);
        // console.log(data);
        console.log( 'connect end -> zedd' );
    });

    console.log( 'wait start -> 3000 millisecond' );
    await new Wait(3000);

    return (()=> {
        console.log(externalData);
        console.log('async end-------------------------');
        alert('async end');
    })();
})();


