var express = require("express");
var app = express();

app.get("/",(req, res) => {

    console.log("Olá mundo!");
    res.send("União flasco")

    var pagseguro = require('pagseguro');  
    pag = new pagseguro({
        email : 'victordevtb@gmail.com',
        token: '9E1086BDE0A44443B77766977BF74901',
        mode : 'sandbox'
    });

    //Configurando a moeda e a referência do pedido
    pag.currency('BRL');
    pag.reference('12345');

    //Adicionando itens
    pag.addItem({
        id: 1,
        description: 'Descrição do primeiro produto',
        amount: "42.00",
        quantity: 3,
        weight: 2342
    });

    pag.addItem({
        id: 2,
        description: 'Esta é uma descrição',
        amount: "52.00",
        quantity: 3,
        weight: 2342
    });

    pag.addItem({
        id: 3,
        description: 'Descrição do último produto',
        amount: "82.00",
        quantity: 3,
        weight: 2342
    });

    //Configurando as informações do comprador
    pag.buyer({
        name: 'José Comprador',
        email: 'c57234980127403730060@sandbox.pagseguro.com.br',
        phoneAreaCode: '51',
        phoneNumber: '12345678'
    });

    //Configurando a entrega do pedido

    pag.shipping({
        type: 1,
        street: 'Rua Alameda dos Anjos',
        number: '367',
        complement: 'Apto 307',
        district: 'Parque da Lagoa',
        postalCode: '01452002',
        city: 'São Paulo',
        state: 'RS',
        country: 'BRA'
    });

    //Configuranto URLs de retorno e de notificação (Opcional)
    //ver https://pagseguro.uol.com.br/v2/guia-de-integracao/finalizacao-do-pagamento.html#v2-item-redirecionando-o-comprador-para-uma-url-dinamica
    pag.setRedirectURL("http://192.241.131.222:3000/retorno");
    pag.setNotificationURL("http://192.241.131.222:3000/not");

    //Enviando o xml ao pagseguro
    pag.send(function(err, res) {
        if (err) {
            console.log(err);
        }
        console.log(res);
    });
});

app.get("/retorno",(req, res) => {
    res.send("UNIÃO FLASCO!");
});

app.get("/not",(req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log("Recebi notificação via GET");
    res.send("OK GET");
});

app.post("/not",(req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log("Recebi notificação via post");
    res.send("OK POST");
});

app.listen(3000,() => {
    console.log("União flasco!");
})