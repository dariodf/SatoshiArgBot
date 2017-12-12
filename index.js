var request = require('request');
var telegram = require('telegram-bot-api');
var token = '215292127:AAFhrWsgpuYaNB3vi-Gnnre-LTK2e_pQv_U';

var api = new telegram({
        token: token,
        updates: {
            enabled: true
    }
}); 

api.on('message', function(message)
{
   request
    ({
    uri: 'https://api.satoshitango.com/v2/ticker',
    method: 'GET'
    }, 
    function(error, response, body) 
    {
    	 var precios = JSON.parse(body);
    	 var buy_arg = parseInt(precios.data.compra.arsbtcround).toLocaleString('de-DE');
    	 var sell_arg = parseInt(precios.data.venta.arsbtcround).toLocaleString('de-DE');
    	 var buy_usd = parseFloat(precios.data.compra.usdbtc).toLocaleString('de-DE');
    	 var sell_usd = parseFloat(precios.data.venta.usdbtc).toLocaleString('de-DE');
    	 return api.sendMessage({chat_id: message.chat.id, text: "*Precios SatoshiTango:*\n_Compra/Venta_\n\nARG: `"+buy_arg+"`/`"+sell_arg+"`\nUSD: `"+buy_usd+"`/`"+sell_usd+"`", parse_mode:'Markdown'}, function (err) {if (err) console.log(err);});
    });
    request
    ({
    uri: 'https://www.ripio.com/api/v1/rates/',
    method: 'GET'
    }, 
    function(error, response, body) 
    {
    	 var precios = JSON.parse(body);
    	 var buy_arg = parseInt(precios.rates.ARS_BUY).toLocaleString('de-DE');
    	 var sell_arg = parseInt(precios.rates.ARS_SELL).toLocaleString('de-DE');
    	 var buy_usd = parseFloat(precios.rates.USD_BUY).toLocaleString('de-DE');
    	 var sell_usd = parseFloat(precios.rates.USD_SELL).toLocaleString('de-DE');
    	 return api.sendMessage({chat_id: message.chat.id, text: "*Precios Ripio:*\n_Compra/Venta_\n\nARG: `"+buy_arg+"`/`"+sell_arg+"`\nUSD: `"+buy_usd+"`/`"+sell_usd+"`", parse_mode:'Markdown'}, function (err) {if (err) console.log(err);});
    });
    request
    ({
    uri: 'https://api.satoshitango.com/v2/ticker',
    method: 'GET'
    }, 
    function(error, response, body) 
    {

    	var precios = JSON.parse(body);
    	request
	    ({
	    uri: 'https://www.ripio.com/api/v1/rates/',
	    method: 'GET'
	    }, 
	    function(error, response, body2) 
	    {
	    	 var precios2 = JSON.parse(body2);
	    	 var ratio = parseFloat(precios.data.venta.arsbtcround/precios2.rates.ARS_BUY).toFixed(3).toLocaleString('de-DE');
	    	 return api.sendMessage({chat_id: message.chat.id, text: "*Ratio SatoshiTango/Ripio:*\n`"+ratio+"`", parse_mode:'Markdown', reply_markup: JSON.stringify({keyboard: [[{text: 'BTC!'}]], resize_keyboard: true})}, function (err) {if (err) console.log(err);});
	    });
    });

}); 