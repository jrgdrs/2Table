#!/usr/bin/env node

const fs = require('fs');

const $jsonFile = process.argv[2]; //'./composer.json'

const $jsonData = fs.readFileSync( $jsonFile, { encoding: 'utf8', flag: 'r' });

function processElement( $in ){
    if( typeof $in != 'object' ){
        return $in;
    } else {
        let $out = '<table>';
        for( const [key, value] of Object.entries( $in )){
            $out += '<tr><td>';
            $out += key;
            $out += ':&emsp;</td><td>';
            $out += processElement( value );
            $out += '</td></tr>';
        };
        $out += '</table>';
        return $out;
    }
}

console.log(`
<style>
   table { border-collapse: collapse; }
   tr { vertical-align: top;  } 
   td { border-top: 1px solid #ccc; } 
</style>
`);

console.log( processElement( JSON.parse( $jsonData )));

