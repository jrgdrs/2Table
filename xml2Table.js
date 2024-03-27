#!/usr/bin/env node
const fs = require('fs');
const convert = require('xml-js');
const $fileName = process.argv[2]; 
const $fileData = fs.readFileSync( $fileName, { encoding: 'utf8', flag: 'r' });
var $jsonData = convert.xml2json($fileData , {compact: true, spaces: 4});

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

